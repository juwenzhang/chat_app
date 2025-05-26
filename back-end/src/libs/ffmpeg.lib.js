import { ffmpeg } from "@ffmpeg/ffmpeg";
import logger from '../logger/logger.js';

export const convertVideo = (inputPath, outputPath, format) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .toFormat(format)
      .on('end', () => {
        logger.info(`视频转码完成: ${inputPath} -> ${outputPath}`);
        resolve('视频转码完成');
      })
      .on('error', (err) => {
        logger.error(`视频转码出错: ${err.message}`);
        reject(err);
      })
      .run();
  });
};

export const getVideoMetadata = (inputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(inputPath, (err, metadata) => {
      if (err) {
        logger.error(`获取视频元数据出错: ${err.message}`);
        reject(err);
      } else {
        logger.info(`获取视频元数据完成: ${inputPath}`);
        resolve(metadata);
      }
    });
  });
};