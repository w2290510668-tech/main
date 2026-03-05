"use client";

import { useEffect, useState } from "react";

type VisitorRecord = {
  id: number;
  visitor_name: string;
  phone: string;
  host_name: string;
  visit_date: string;
  visit_time_slot: string;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const [rows, setRows] = useState<VisitorRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  async function loadRows() {
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/visitors", { cache: "no-store" });
    const result = (await response.json()) as {
      data?: VisitorRecord[];
      error?: string;
    };

    if (!response.ok) {
      setError(result.error ?? "加载预约记录失败");
      setLoading(false);
      return;
    }

    setRows(result.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadRows();
  }, []);

  async function approve(id: number) {
    setUpdatingId(id);
    setError("");

    const response = await fetch(`/api/admin/visitors/${id}/approve`, {
      method: "PATCH"
    });

    const result = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(result.error ?? "审核失败，请稍后再试");
      setUpdatingId(null);
      return;
    }

    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status: "已通过" } : row))
    );
    setUpdatingId(null);
  }

  return (
    <main className="page admin-page">
      <section className="card">
        <p className="tag">内部管理</p>
        <h1>预约审核工作台</h1>
        <p className="subtitle">查看所有来访预约记录，并对待审核记录执行“已通过”操作。</p>
      </section>

      <section className="card admin-table-wrap">
        {loading ? <p>加载中...</p> : null}
        {error ? <p className="form-message error">{error}</p> : null}

        {!loading ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>访客姓名</th>
                <th>手机号</th>
                <th>被访人</th>
                <th>来访日期</th>
                <th>时段</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.visitor_name}</td>
                  <td>{row.phone}</td>
                  <td>{row.host_name}</td>
                  <td>{row.visit_date}</td>
                  <td>{row.visit_time_slot}</td>
                  <td>
                    <span
                      className={`status-pill ${
                        row.status === "已通过" ? "approved" : "pending"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="primary"
                      disabled={row.status !== "待审核" || updatingId === row.id}
                      onClick={() => approve(row.id)}
                    >
                      {updatingId === row.id ? "处理中..." : "通过"}
                    </button>
                  </td>
                </tr>
              ))}

              {!rows.length ? (
                <tr>
                  <td colSpan={8}>暂无预约记录</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        ) : null}
      </section>
    </main>
  );
}
