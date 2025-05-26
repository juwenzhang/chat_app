# 使用 Node.js 基础镜像进行构建
FROM node:18 as build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml 到工作目录
COPY package.json pnpm-lock.yaml ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装项目依赖
RUN pnpm install

# 复制项目代码到工作目录
COPY . .

# 构建项目
RUN pnpm build

# 使用 Nginx 基础镜像进行生产环境部署
FROM nginx:1.23

# 复制构建好的静态文件到 Nginx 静态文件目录
COPY --from=build /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 5173

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]