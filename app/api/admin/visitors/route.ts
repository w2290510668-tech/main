import { NextResponse } from "next/server";
import { supabaseHeaders, supabaseRestUrl } from "@/lib/supabase-rest";

export async function GET() {
  try {
    const query = new URLSearchParams({
      select:
        "id,visitor_name,phone,host_name,visit_date,visit_time_slot,status,created_at",
      order: "created_at.desc"
    });

    const response = await fetch(supabaseRestUrl(`/visitors?${query}`), {
      headers: supabaseHeaders(),
      cache: "no-store"
    });

    if (!response.ok) {
      const message = await response.text();
      return NextResponse.json(
        { error: `查询失败：${message}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "服务异常" },
      { status: 500 }
    );
  }
}
