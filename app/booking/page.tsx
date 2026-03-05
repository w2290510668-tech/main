"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type SubmitState = {
  loading: boolean;
  error: string;
  success: string;
};

export default function BookingPage() {
  const [state, setState] = useState<SubmitState>({
    loading: false,
    error: "",
    success: ""
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ loading: true, error: "", success: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);

    const visitorName = String(formData.get("visitorName") || "").trim();
    const phone = String(formData.get("mobile") || "").trim();

    if (!visitorName) {
      setState({ loading: false, error: "请填写姓名", success: "" });
      return;
    }

    if (!phone) {
      setState({ loading: false, error: "请填写手机号", success: "" });
      return;
    }

    if (!/^1\d{10}$/.test(phone)) {
      setState({ loading: false, error: "手机号格式不正确，请输入11位手机号", success: "" });
      return;
    }

    const payload = {
      visitorName,
      phone,
      company: String(formData.get("company") || ""),
      employeeNo: String(formData.get("employeeNo") || ""),
      visitDate: String(formData.get("visitDate") || ""),
      visitSlot: String(formData.get("visitSlot") || ""),
      hostName: String(formData.get("hostName") || ""),
      hostDept: String(formData.get("hostDept") || ""),
      visitorType: String(formData.get("visitorType") || "正式"),
      purpose: String(formData.get("purpose") || "")
    };

    const response = await fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = (await response.json()) as { error?: string; id?: number };

    if (!response.ok) {
      setState({ loading: false, error: result.error ?? "提交失败，请稍后再试", success: "" });
      return;
    }

    form.reset();
    setState({
      loading: false,
      error: "",
      success: `预约提交成功，单号ID：${result.id ?? "已生成"}，当前状态：待审核。`
    });
  }

  return (
    <main className="page">
      <section className="card booking-header">
        <p className="tag">在线预约</p>
        <h1>来访预约申请</h1>
        <p className="subtitle">请填写以下信息，提交后将进入审批流程。</p>
      </section>

      <form className="card booking-form" onSubmit={handleSubmit}>
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
              placeholder="请输入11位手机号"
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
              <option value="上午（09:00-12:00）">上午（09:00-12:00）</option>
              <option value="下午（13:00-18:00）">下午（13:00-18:00）</option>
              <option value="其他时段">其他时段</option>
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
            <select name="visitorType" required defaultValue="正式">
              <option value="正式">正式</option>
              <option value="非正式">非正式</option>
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

        {state.error ? <p className="form-message error">{state.error}</p> : null}
        {state.success ? <p className="form-message success">{state.success}</p> : null}

        <div className="actions">
          <button type="submit" className="primary" disabled={state.loading}>
            {state.loading ? "提交中..." : "提交预约"}
          </button>
          <Link href="/" className="secondary action-link">
            返回首页
          </Link>
        </div>
      </form>
    </main>
  );
}
