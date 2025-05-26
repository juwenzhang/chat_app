import sharp from 'sharp';
import logger from '../logger/logger.js';

// 封装图片压缩方法
export const compressImage = async (inputPath, outputPath, quality = 70) => {
  try {
    await sharp(inputPath)
      .jpeg({ quality })
      .toFile(outputPath);
    logger.info(`图片压缩完成: ${inputPath} -> ${outputPath}`);
    return outputPath;
  } catch (error) {
    logger.error(`图片压缩出错: ${error.message}`);
    throw error;
  }
};

// 封装图片调整大小方法
export const resizeImage = async (inputPath, outputPath, width, height) => {
  try {
    await sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath);
    logger.info(`图片调整大小完成: ${inputPath} -> ${outputPath}`);
    return outputPath;
  } catch (error) {
    logger.error(`图片调整大小出错: ${error.message}`);
    throw error;
  }
};

// 封装图片格式转换方法
export const convertImageFormat = async (inputPath, outputPath, format) => {
  try {
    await sharp(inputPath)
      .toFormat(format)
      .toFile(outputPath);
    logger.info(`图片格式转换完成: ${inputPath} -> ${outputPath} (格式: ${format})`);
    return outputPath;
  } catch (error) {
    logger.error(`图片格式转换出错: ${error.message}`);
    throw error;
  }
};