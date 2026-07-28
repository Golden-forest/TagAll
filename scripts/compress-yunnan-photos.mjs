#!/usr/bin/env node
/**
 * 云南旅游照片批量压缩脚本
 *
 * 将 /Users/hl/Pictures/2026云南/ 下的原始 JPG/PNG
 * 压缩为 WebP（maxWidth 1600, quality 78），
 * 输出到 public/demo-assets/，按章节命名映射。
 *
 * 用法：
 *   node scripts/compress-yunnan-photos.mjs
 */

import { existsSync, statfs } from 'node:fs';
import { stat, readFile } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const SOURCE_DIR = '/Users/hl/Pictures/2026云南';
const TARGET_DIR = join(projectRoot, 'public', 'demo-assets');

// 压缩参数
const MAX_WIDTH = 1600;
const QUALITY = 78;

/**
 * 章节与命名映射表
 * 格式: [源文件名, 目标文件名, 章节标签]
 */
const MAPPINGS = [
  // ===== Hero 图（4 张）=====
  ['滇池2.jpg', 'yunnan-hero-01.webp', 'Hero'],
  ['纳帕海3.jpg', 'yunnan-hero-02.webp', 'Hero'],
  ['松赞林寺3.jpg', 'yunnan-hero-03.webp', 'Hero'],
  ['虎跳峡1.jpg', 'yunnan-hero-04.webp', 'Hero'],

  // ===== 序章 Prologue（3 张）=====
  ['出行前暂定攻略.png', 'yunnan-prologue-01.webp', 'Prologue'],
  ['服务区休息.jpg', 'yunnan-prologue-02.webp', 'Prologue'],
  ['自驾路边11.jpg', 'yunnan-prologue-03.webp', 'Prologue'],

  // ===== Day 1 - 昆明·滇池·赶大集（6 张）=====
  ['滇池.jpg', 'yunnan-day1-01.webp', 'Day1'],
  ['滇池2.jpg', 'yunnan-day1-02.webp', 'Day1'],
  ['赶大集.jpg', 'yunnan-day1-03.webp', 'Day1'],
  ['排骨炸薄荷.jpg', 'yunnan-day1-04.webp', 'Day1'],
  ['自驾路边1.jpg', 'yunnan-day1-05.webp', 'Day1'],
  ['云南第一餐野生菌火锅.jpg', 'yunnan-day1-06.webp', 'Day1'],

  // ===== Day 2 - 巍山古城·自驾·香格里拉（6 张）=====
  ['自驾路边10.jpg', 'yunnan-day2-01.webp', 'Day2'],
  ['香格里拉.jpg', 'yunnan-day2-02.webp', 'Day2'],
  ['松赞林寺.jpg', 'yunnan-day2-03.webp', 'Day2'],
  ['松赞林寺3.jpg', 'yunnan-day2-04.webp', 'Day2'],
  ['松赞林寺5.jpg', 'yunnan-day2-05.webp', 'Day2'],
  ['纳帕海3.jpg', 'yunnan-day2-06.webp', 'Day2'],

  // ===== Day 3 - 纳帕海·吐司宴·国道（6 张）=====
  ['纳帕海.jpg', 'yunnan-day3-01.webp', 'Day3'],
  ['纳帕海5.jpg', 'yunnan-day3-02.webp', 'Day3'],
  ['吐司宴.jpg', 'yunnan-day3-03.webp', 'Day3'],
  ['自驾路边13.jpg', 'yunnan-day3-04.webp', 'Day3'],
  ['虎跳峡7.jpg', 'yunnan-day3-05.webp', 'Day3'],
  ['虎跳峡1.jpg', 'yunnan-day3-06.webp', 'Day3'],

  // ===== Day 4 - 虎跳峡·丽江·束河采菌子（7 张）=====
  ['虎跳峡2.jpg', 'yunnan-day4-01.webp', 'Day4'],
  ['虎跳峡3.jpg', 'yunnan-day4-02.webp', 'Day4'],
  ['虎跳峡5.jpg', 'yunnan-day4-03.webp', 'Day4'],
  ['越好看的蘑菇越有毒.jpg', 'yunnan-day4-04.webp', 'Day4'],
  ['采菌子.jpg', 'yunnan-day4-05.webp', 'Day4'],
  ['挖菌子大本营.jpg', 'yunnan-day4-06.webp', 'Day4'],
  ['老板娘姐姐盛情款待.jpg', 'yunnan-day4-07.webp', 'Day4'],

  // ===== Day 5 - 当归小院·束河夜游·丽江（5 张）=====
  ['当归小院乌托邦标语.jpg', 'yunnan-day5-01.webp', 'Day5'],
  ['当归小院晚餐.jpg', 'yunnan-day5-02.webp', 'Day5'],
  ['鲜花饼残渣.jpg', 'yunnan-day5-03.webp', 'Day5'],
  ['飞机延误.jpg', 'yunnan-day5-04.webp', 'Day5'],
  ['离开香格里拉.jpg', 'yunnan-day5-05.webp', 'Day5'],

  // ===== 尾声 Epilogue（3 张）=====
  ['随地睡觉.jpg', 'yunnan-epilogue-01.webp', 'Epilogue'],
  ['ChatGPT Image Jul 24, 2026, 12_38_34 AM.png', 'yunnan-epilogue-02.webp', 'Epilogue'],
  ['ChatGPT Image Jul 24, 2026, 12_41_19 AM.png', 'yunnan-epilogue-03.webp', 'Epilogue'],
];

/**
 * 格式化字节数为人类可读字符串
 * @param {number} bytes
 * @returns {string}
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(2)} ${sizes[i]}`;
}

/**
 * 主函数：批量压缩
 */
async function main() {
  console.log('=================================================');
  console.log('云南旅游照片批量压缩');
  console.log('=================================================');
  console.log(`源目录:   ${SOURCE_DIR}`);
  console.log(`目标目录: ${TARGET_DIR}`);
  console.log(`参数:     maxWidth=${MAX_WIDTH}, quality=${QUALITY}, format=webp`);
  console.log(`待处理:   ${MAPPINGS.length} 张`);
  console.log('');

  // 检查目标目录是否存在
  if (!existsSync(TARGET_DIR)) {
    console.error(`✗ 目标目录不存在: ${TARGET_DIR}`);
    process.exit(1);
  }

  // 检查源目录
  if (!existsSync(SOURCE_DIR)) {
    console.error(`✗ 源目录不存在: ${SOURCE_DIR}`);
    process.exit(1);
  }

  const results = [];
  const skipped = [];
  let totalOriginal = 0;
  let totalCompressed = 0;
  let successCount = 0;
  let failedCount = 0;

  // 章节小计
  const sectionStats = {};

  for (const [srcName, targetName, section] of MAPPINGS) {
    const srcPath = join(SOURCE_DIR, srcName);
    const targetPath = join(TARGET_DIR, targetName);

    // 检查源文件
    if (!existsSync(srcPath)) {
      const msg = `[跳过] 源文件不存在: ${srcName}`;
      console.warn(`⚠ ${msg}`);
      skipped.push({ srcName, targetName, section, reason: 'source-not-found' });
      continue;
    }

    try {
      const srcStat = await stat(srcPath);
      const originalSize = srcStat.size;
      const originalBuffer = await readFile(srcPath);

      // 用 sharp 处理
      const compressedBuffer = await sharp(originalBuffer)
        .resize({
          width: MAX_WIDTH,
          withoutEnlargement: true,
        })
        .webp({ quality: QUALITY })
        .toBuffer();

      // 写入目标文件（用 sharp.toFile 也可，但 toBuffer 后写入能让我们准确知道大小）
      const { writeFile } = await import('node:fs/promises');
      await writeFile(targetPath, compressedBuffer);

      const compressedSize = compressedBuffer.length;
      const reduction = originalSize > 0
        ? ((1 - compressedSize / originalSize) * 100).toFixed(1)
        : '0.0';

      totalOriginal += originalSize;
      totalCompressed += compressedSize;
      successCount++;

      // 章节小计
      if (!sectionStats[section]) {
        sectionStats[section] = { count: 0, original: 0, compressed: 0 };
      }
      sectionStats[section].count++;
      sectionStats[section].original += originalSize;
      sectionStats[section].compressed += compressedSize;

      results.push({
        section,
        srcName,
        targetName,
        originalSize,
        compressedSize,
        reduction: parseFloat(reduction),
      });

      console.log(
        `[${section.padEnd(8)}] ${srcName.padEnd(40)} ${formatBytes(originalSize).padStart(10)}` +
        ` → ${formatBytes(compressedSize).padStart(9)}  ` +
        `(-${reduction}%)`
      );
    } catch (err) {
      console.error(`✗ [失败] ${srcName}: ${err.message}`);
      failedCount++;
      skipped.push({ srcName, targetName, section, reason: err.message });
    }
  }

  // 总体统计
  console.log('');
  console.log('=================================================');
  console.log('章节统计');
  console.log('=================================================');
  const sectionOrder = ['Hero', 'Prologue', 'Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Epilogue'];
  for (const sec of sectionOrder) {
    if (!sectionStats[sec]) continue;
    const s = sectionStats[sec];
    const reduction = s.original > 0
      ? ((1 - s.compressed / s.original) * 100).toFixed(1)
      : '0.0';
    console.log(
      `  ${sec.padEnd(10)} ${String(s.count).padStart(2)} 张  ` +
      `${formatBytes(s.original).padStart(10)} → ${formatBytes(s.compressed).padStart(9)}  ` +
      `(-${reduction}%)`
    );
  }

  console.log('');
  console.log('=================================================');
  console.log('总统计');
  console.log('=================================================');
  console.log(`成功处理:   ${successCount} / ${MAPPINGS.length}`);
  console.log(`跳过/失败:  ${skipped.length} (跳过 ${skipped.filter(s => s.reason === 'source-not-found').length}, 失败 ${failedCount})`);
  console.log(`原始总大小: ${formatBytes(totalOriginal)}`);
  console.log(`压缩总大小: ${formatBytes(totalCompressed)}`);
  if (totalOriginal > 0) {
    const totalReduction = ((1 - totalCompressed / totalOriginal) * 100).toFixed(1);
    const savedBytes = totalOriginal - totalCompressed;
    console.log(`节省空间:   ${formatBytes(savedBytes)} (-${totalReduction}%)`);
  }
  console.log('');

  if (skipped.length > 0) {
    console.log('⚠ 跳过列表:');
    for (const s of skipped) {
      console.log(`   - [${s.section}] ${s.srcName} → ${s.targetName} (${s.reason})`);
    }
    console.log('');
  }

  console.log('完成。');
}

main().catch((err) => {
  console.error('未捕获错误:', err);
  process.exit(1);
});
