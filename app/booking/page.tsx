import Link from "next/link";

export default function BookingPage() {
  return (
    <main className="page">
      <section className="card booking-header">
        <p className="tag">在线预约</p>
        <h1>来访预约申请</h1>
        <p className="subtitle">请填写以下信息，提交后将进入审批流程。</p>
      </section>

      <form className="card booking-form" action="#" method="post">
        <div className="form-grid">
          <label>
            <span>姓名 *</span>
            <input name="visitorName" required placeholder="请输入姓名" />
          </label>

          <label>
            <span>手机号 *</span>
            <input
              name="mobile"
              required
              placeholder="请输入手机号"
              inputMode="numeric"
            />
          </label>

          <label>
            <span>所属单位 *</span>
            <input name="company" required placeholder="请输入单位名称" />
          </label>

          <label>
            <span>员工编号（选填）</span>
            <input name="employeeNo" placeholder="请输入员工编号" />
          </label>

          <label>
            <span>来访日期 *</span>
            <input name="visitDate" required type="date" />
          </label>

          <label>
            <span>来访时段 *</span>
            <select name="visitSlot" required defaultValue="">
              <option value="" disabled>
                请选择时段
              </option>
              <option value="morning">上午（09:00-12:00）</option>
              <option value="afternoon">下午（13:00-18:00）</option>
              <option value="custom">其他时段</option>
            </select>
          </label>

          <label>
            <span>被访人姓名 *</span>
            <input name="hostName" required placeholder="请输入被访人姓名" />
          </label>

          <label>
            <span>被访部门 *</span>
            <input name="hostDept" required placeholder="请输入被访部门" />
          </label>

          <label>
            <span>人员性质 *</span>
            <select name="visitorType" required defaultValue="formal">
              <option value="formal">正式</option>
              <option value="informal">非正式</option>
            </select>
          </label>

          <label className="full-width">
            <span>来访事由 *</span>
            <textarea
              name="purpose"
              required
              rows={4}
              placeholder="请简要说明来访目的"
            />
          </label>
        </div>

        <label className="consent">
          <input type="checkbox" required />
          <span>我已阅读并同意个人信息处理说明。</span>
        </label>

        <div className="actions">
          <button type="submit" className="primary">
            提交预约
          </button>
          <Link href="/" className="secondary action-link">
            返回首页
          </Link>
        </div>
      </form>
    </main>
  );
}
