import Link from "next/link";

const features = [
  "在线预约申请：填写来访信息并提交",
  "审批工作台：支持逐条审批与补件",
  "前台签到签退：现场核验与时长记录",
  "统计看板：今日访客数量、平均访问时长"
];

const fields = [
  "姓名",
  "手机号",
  "所属单位",
  "来访日期与时间段",
  "来访事由",
  "被访人姓名 / 部门",
  "人员性质（正式 / 非正式）",
  "员工编号（选填）"
];

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero card">
        <p className="tag">Visitor Booking System</p>
        <h1>来访人员预约系统</h1>
        <p className="subtitle">
          第一版预约首页（MVP）：商务简约蓝色风格，先聚焦“可预约、可审批、可签到、可统计”。
        </p>
        <div className="actions">
          <Link href="/booking" className="primary action-link">
            立即预约
          </Link>
          <button type="button" className="secondary">
            查看预约记录
          </button>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h2>核心能力</h2>
          <ul>
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>预约信息（首版）</h2>
          <ul>
            {fields.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
