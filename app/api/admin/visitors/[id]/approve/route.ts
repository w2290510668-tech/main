import { NextResponse } from "next/server";
import { supabaseHeaders, supabaseRestUrl } from "@/lib/supabase-rest";

export async function PATCH(
  _request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json({ error: "缺少记录ID" }, { status: 400 });
    }

    const query = new URLSearchParams({
      id: `eq.${id}`,
      select: "id,status"
    });

    const response = await fetch(supabaseRestUrl(`/visitors?${query}`), {
      method: "PATCH",
      headers: supabaseHeaders({ Prefer: "return=representation" }),
      body: JSON.stringify({ status: "已通过" }),
      cache: "no-store"
    });

    if (!response.ok) {
      const message = await response.text();
      return NextResponse.json(
        { error: `审核更新失败：${message}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "服务异常" },
      { status: 500 }
    );
  }
}
