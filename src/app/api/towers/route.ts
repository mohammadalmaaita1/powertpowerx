import { NextResponse } from 'next/server';
import { mockTowers, mockAlerts } from '@/lib/mock-data';
import type { Tower, Alert } from '@/lib/types';

// =================================================================================
// الخطوة 1: استبدال البيانات الوهمية باتصال قاعدة بيانات حقيقي
// =================================================================================
// في تطبيق حقيقي، ستقوم بإعداد اتصال بقاعدة البيانات هنا.
// على سبيل المثال, إذا كنت تستخدم Firebase Firestore، قد يبدو الكود هكذا:
/*
import { db } from '@/lib/firebase'; // افترض أن هذا الملف يقوم بتهيئة Firestore
*/

// حاليًا، ما زلنا نعتمد على البيانات الوهمية كبديل مؤقت.
let alerts: Alert[] = mockAlerts;


export async function GET() {
  // =================================================================================
  // الخطوة 2: جلب البيانات الحقيقية من قاعدة البيانات
  // =================================================================================
  // بدلاً من إرجاع البيانات الوهمية، ستقوم بجلب البيانات من Firestore.
  // مثال على كيفية جلب البيانات من Firestore:
  /*
  try {
    const towersSnapshot = await db.collection('towers').get();
    const towersFromDb = towersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tower));
    return NextResponse.json(towersFromDb);
  } catch (error) {
    console.error("Error fetching towers from Firestore:", error);
    return NextResponse.json({ message: 'Failed to fetch towers' }, { status: 500 });
  }
  */

  // لأغراض العرض التوضيحي، سنبقي على إرجاع البيانات الوهمية.
  return NextResponse.json(mockTowers);
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { towerId, status, userLoad, signalStrength } = body;

    if (!towerId) {
        return NextResponse.json({ message: 'towerId is required' }, { status: 400 });
    }

    // =================================================================================
    // الخطوة 3: تحديث البيانات في قاعدة البيانات الحقيقية
    // =================================================================================
    // بدلاً من تحديث المصفوفة في الذاكرة، ستقوم بتحديث المستند في Firestore.
    // مثال على كيفية تحديث البيانات في Firestore:
    /*
    try {
      const towerRef = db.collection('towers').doc(towerId);
      const dataToUpdate = {
        status,
        userLoad,
        signalStrength,
        lastUpdated: new Date().toISOString()
      };
      // إزالة أي حقول غير معرفة لتجنب الكتابة فوقها بقيم فارغة
      Object.keys(dataToUpdate).forEach(key => (dataToUpdate as any)[key] === undefined && delete (dataToUpdate as any)[key]);
      
      await towerRef.update(dataToUpdate);

      if (status === 'critical') {
        const towerDoc = await towerRef.get();
        const towerData = towerDoc.data();
        const newAlert: Alert = {
            id: `ALT-${Date.now()}`,
            towerId: towerId,
            towerName: towerData?.name || 'Unknown Tower',
            severity: 'critical',
            message: `Tower ${towerData?.name} just went offline!`,
            timestamp: new Date().toISOString(),
        };
        await db.collection('alerts').add(newAlert);
      }

      const updatedDoc = await towerRef.get();
      return NextResponse.json({ id: updatedDoc.id, ...updatedDoc.data() });

    } catch (error) {
        console.error(`Error updating tower ${towerId}:`, error);
        return NextResponse.json({ message: `Tower with id ${towerId} not found or error updating` }, { status: 404 });
    }
    */
    
    // حاليًا، سنبقي على تحديث البيانات الوهمية في الذاكرة.
    const towerIndex = mockTowers.findIndex(t => t.id === towerId);

    if (towerIndex === -1) {
        return NextResponse.json({ message: `Tower with id ${towerId} not found` }, { status: 404 });
    }

    if (status) mockTowers[towerIndex].status = status;
    if (userLoad !== undefined) mockTowers[towerIndex].userLoad = userLoad;
    if (signalStrength !== undefined) mockTowers[towerIndex].signalStrength = signalStrength;

    if (status === 'critical') {
        const newAlert: Alert = {
            id: `ALT-${Date.now()}`,
            towerId: mockTowers[towerIndex].id,
            towerName: mockTowers[towerIndex].name,
            severity: 'critical',
            message: `Tower ${mockTowers[towerIndex].name} just went offline!`,
            timestamp: new Date().toISOString(),
        };
        alerts.unshift(newAlert);
    }

    return NextResponse.json(mockTowers[towerIndex]);
  } catch (error) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}
