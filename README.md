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
- `app/booking/page.tsx`：预约表单页（由“立即预约”进入）
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

## Supabase 建表 SQL（visitors）

> 使用位置：Supabase 控制台 -> SQL Editor -> New query -> 粘贴后点击 Run

```sql
-- 1. 创建访客预约主表：visitors
create table if not exists public.visitors (
  id bigint generated always as identity primary key, -- 主键ID（自增）
  visitor_name text not null,                         -- 访客姓名（必填）
  phone text not null,                                -- 联系电话（必填）
  company text,                                       -- 所属单位（选填）
  visitor_type text not null default '正式',           -- 人员性质：正式/非正式（默认正式）
  employee_no text,                                   -- 员工编号（选填）

  host_name text not null,                            -- 被访人姓名（必填）
  host_department text,                               -- 被访部门（选填）

  visit_date date not null,                           -- 来访日期（必填）
  visit_time_slot text not null,                      -- 来访时段（如 上午/下午/自定义）
  purpose text not null,                              -- 来访事由（必填）

  status text not null default '待审核',               -- 预约状态（默认：待审核）
  remark text,                                        -- 备注（选填）

  created_at timestamptz not null default now(),      -- 创建时间（默认当前时间）
  updated_at timestamptz not null default now()       -- 更新时间（默认当前时间）
);

-- 2. 给常用查询字段加索引（提升检索速度）
create index if not exists idx_visitors_phone on public.visitors (phone);                 -- 按手机号查询
create index if not exists idx_visitors_visit_date on public.visitors (visit_date);       -- 按来访日期查询
create index if not exists idx_visitors_status on public.visitors (status);               -- 按状态查询
create index if not exists idx_visitors_host_name on public.visitors (host_name);         -- 按被访人查询

-- 3. 自动维护 updated_at：更新数据时自动刷新更新时间
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now(); -- 每次更新时把 updated_at 改为当前时间
  return new;             -- 返回更新后的新记录
end;
$$;

drop trigger if exists trg_visitors_set_updated_at on public.visitors; -- 避免重复创建触发器
create trigger trg_visitors_set_updated_at
before update on public.visitors
for each row
execute function public.set_updated_at(); -- 绑定自动更新时间函数
```


## 环境变量配置（Supabase）

1. 复制模板文件并创建本地环境变量文件：

```bash
cp .env.example .env.local
```

2. 打开 `.env.local`，填写以下两个值（从 Supabase -> Settings -> API 获取）：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. 保存后重启本地开发服务，或重新部署到 Vercel。
