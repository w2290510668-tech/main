import { NextResponse } from "next/server";
import { supabaseHeaders, supabaseRestUrl } from "@/lib/supabase-rest";

type CreateVisitorPayload = {
  visitorName?: string;
  phone?: string;
  company?: string;
  employeeNo?: string;
  visitDate?: string;
  visitSlot?: string;
  hostName?: string;
  hostDept?: string;
  visitorType?: "正式" | "非正式";
  purpose?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreateVisitorPayload;

    if (!payload.visitorName?.trim()) {
      return NextResponse.json({ error: "请填写姓名" }, { status: 400 });
    }

    if (!payload.phone?.trim()) {
      return NextResponse.json({ error: "请填写手机号" }, { status: 400 });
    }

    if (!/^1\d{10}$/.test(payload.phone.trim())) {
      return NextResponse.json({ error: "手机号格式不正确" }, { status: 400 });
    }

    if (!payload.hostName?.trim() || !payload.visitDate || !payload.visitSlot) {
      return NextResponse.json(
        { error: "请完整填写被访人、来访日期和来访时段" },
        { status: 400 }
      );
    }

    const insertBody = [
      {
        visitor_name: payload.visitorName.trim(),
        phone: payload.phone.trim(),
        company: payload.company?.trim() || null,
        employee_no: payload.employeeNo?.trim() || null,
        visit_date: payload.visitDate,
        visit_time_slot: payload.visitSlot,
        host_name: payload.hostName.trim(),
        host_department: payload.hostDept?.trim() || null,
        visitor_type: payload.visitorType ?? "正式",
        purpose: payload.purpose?.trim() || "未填写",
        status: "待审核"
      }
    ];

    const response = await fetch(supabaseRestUrl("/visitors"), {
      method: "POST",
      headers: supabaseHeaders({ Prefer: "return=representation" }),
      body: JSON.stringify(insertBody),
      cache: "no-store"
    });

    if (!response.ok) {
      const message = await response.text();
      return NextResponse.json(
        { error: `写入失败：${message}` },
        { status: response.status }
      );
    }

    const [created] = (await response.json()) as Array<{ id: number }>;

    return NextResponse.json({ ok: true, id: created?.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "服务异常" },
      { status: 500 }
    );
  }
}
