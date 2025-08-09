import { NextResponse } from 'next/server';
import { mockTowers } from '@/lib/mock-data';
import type { Tower } from '@/lib/types';

// في تطبيق حقيقي، سيتم استبدال هذا بمنطق لجلب البيانات من قاعدة بيانات
// مثل Firebase Firestore.
/*
import { db } from '@/lib/firebase';
*/

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // مثال على جلب برج واحد من Firestore
  /*
  try {
    const towerRef = db.collection('towers').doc(params.id);
    const doc = await towerRef.get();
    if (!doc.exists) {
      return NextResponse.json({ message: 'Tower not found' }, { status: 404 });
    }
    const tower = { id: doc.id, ...doc.data() } as Tower;
    return NextResponse.json([tower]); // يتم إرجاعها كمصفوفة للحفاظ على التوافق
  } catch (error) {
    console.error("Error fetching tower:", error);
    return NextResponse.json({ message: 'Failed to fetch tower' }, { status: 500 });
  }
  */

  // الكود الحالي الذي يستخدم البيانات الوهمية
  const tower = mockTowers.find(t => t.id === params.id);
  if (tower) {
    // يتم إرجاعها كمصفوفة للحفاظ على التوافق مع الصفحة
    return NextResponse.json([tower]);
  } else {
    return NextResponse.json({ message: 'Tower not found' }, { status: 404 });
  }
}
