# 来访人员预约系统（Next.js 初始化版）

这是一个基于 **Next.js App Router + TypeScript** 的初始化项目，用于“来访人员预约系统”的第一版演示。

## 本地运行

```bash
npm install
npm run dev
```

启动后访问：<http://localhost:3000>

## 当前实现

- `app/page.tsx`：预约首页（商务简约蓝色风格）
- `app/layout.tsx`：全局布局与页面元数据
- `app/globals.css`：全局样式变量与基础样式

## 部署到 Vercel（Codex 按钮流程）

1. 在 Codex 项目界面找到 **Deploy** 按钮并点击。
2. 选择 **Vercel** 作为部署目标。
3. 首次部署时，按提示完成账号授权与项目关联。
4. 保持默认配置（Framework Preset 通常会自动识别 Next.js），点击确认部署。
5. 等待构建完成后，Vercel 会返回线上访问地址。

## Vercel 链接在哪里看

- **Codex 界面**：部署任务完成后的结果面板会显示生产链接（通常形如 `https://xxx.vercel.app`）。
- **Vercel 控制台**：进入对应项目，在 `Deployments` 列表中查看最新部署，点击即可打开线上站点。
