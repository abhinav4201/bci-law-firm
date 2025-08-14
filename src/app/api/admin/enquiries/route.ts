import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";
import * as admin from "firebase-admin"; // --- CORRECTED: Import admin namespace ---

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let query: admin.firestore.Query = adminDb
      .collection("enquiries")
      .orderBy("submittedAt", "desc");

    if (startDate) {
      query = query.where(
        "submittedAt",
        ">=",
        Timestamp.fromDate(new Date(startDate))
      );
    }
    if (endDate) {
      const inclusiveEndDate = new Date(endDate);
      inclusiveEndDate.setDate(inclusiveEndDate.getDate() + 1);
      query = query.where(
        "submittedAt",
        "<",
        Timestamp.fromDate(inclusiveEndDate)
      );
    }

    const totalSnapshot = await query.get();
    const total = totalSnapshot.size;

    const offset = (page - 1) * limit;
    query = query.limit(limit).offset(offset);

    const snapshot = await query.get();
    // --- CORRECTED: Explicitly type 'doc' ---
    const enquiries = snapshot.docs.map(
      (doc: admin.firestore.QueryDocumentSnapshot) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          submittedAt: data.submittedAt.toDate().toISOString(),
        };
      }
    );

    return NextResponse.json({
      enquiries,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}
