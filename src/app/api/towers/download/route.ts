import { NextResponse } from 'next/server';
import { mockTowers } from '@/lib/mock-data';
import type { Tower } from '@/lib/types';

function convertToCSV(data: Tower[]): string {
  if (data.length === 0) {
    return "";
  }

  const headers = Object.keys(data[0]).filter(key => key !== 'historicalData' && key !== 'batteryCells');
  const csvRows = [headers.join(',')];

  for (const row of data) {
    const values = headers.map(header => {
      // Handle potential commas in string values by wrapping them in quotes
      const value = String(row[header as keyof Omit<Tower, 'historicalData' | 'batteryCells'>]);
      return `"${value.replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}

export async function GET() {
  // في تطبيق حقيقي، ستقوم بجلب هذه البيانات من قاعدة البيانات
  // مثال على كيفية جلب البيانات من Firestore:
  /*
  const towersSnapshot = await db.collection('towers').get();
  const towers = towersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tower));
  */
  
  // الكود الحالي الذي يستخدم البيانات الوهمية
  const towers = mockTowers;
  
  // لا نريد تضمين البيانات التاريخية المفصلة أو بيانات خلايا البطارية في هذا التقرير
  const simplifiedTowers = towers.map(tower => {
      const { historicalData, batteryCells, ...rest } = tower;
      return rest;
  });

  const csvData = convertToCSV(simplifiedTowers as any);

  return new NextResponse(csvData, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="towers_report_${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}
