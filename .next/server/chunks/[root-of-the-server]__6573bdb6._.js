module.exports = {

"[project]/.next-internal/server/app/api/towers/[id]/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/@opentelemetry/api [external] (@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@opentelemetry/api", () => require("@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/lib/mock-data.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "mockAlerts": (()=>mockAlerts),
    "mockTowers": (()=>mockTowers)
});
function generateHistoricalData(days) {
    const data = [];
    for(let i = days - 1; i >= 0; i--){
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.push({
            date: date.toISOString().split('T')[0],
            signalStrength: -60 - Math.floor(Math.random() * 20),
            userLoad: 100 + Math.floor(Math.random() * 150),
            uploadSpeed: 20 + Math.floor(Math.random() * 30),
            downloadSpeed: 100 + Math.floor(Math.random() * 100),
            energyConsumption: 50 + Math.floor(Math.random() * 25),
            stateOfCharge: 85 + Math.floor(Math.random() * 15),
            voltage: 53.5 + (Math.random() - 0.5)
        });
    }
    return data;
}
function generateBatteryCells(count, isCharging) {
    const cells = [];
    for(let i = 1; i <= count; i++){
        cells.push({
            id: i,
            voltage: parseFloat((3.7 + (Math.random() * 0.5 - 0.25)).toFixed(2)),
            current: parseFloat((isCharging ? 1 : -1) * Math.random() * 5).toFixed(2),
            stateOfCharge: Math.floor(80 + Math.random() * 20),
            temperature: Math.floor(25 + Math.random() * 10),
            internalResistance: parseFloat((15 + Math.random() * 5).toFixed(2))
        });
    }
    return cells;
}
const mockTowers = [
    {
        id: 'TWR-001',
        name: 'Khalda Tower',
        location: 'Amman, Jordan',
        status: 'normal',
        latitude: 31.9876,
        longitude: 35.8437,
        signalStrength: -65,
        userLoad: 235,
        uploadSpeed: 45.2,
        downloadSpeed: 180.5,
        latency: 22,
        energyConsumption: 68.5,
        batteryType: "Lithium-ion",
        batteryCapacity: 200,
        batteryCells: generateBatteryCells(8, true),
        historicalData: generateHistoricalData(30),
        powerSource: "grid"
    },
    {
        id: 'TWR-002',
        name: 'Al-Hashmi Tower',
        location: 'Irbid, Jordan',
        status: 'normal',
        latitude: 32.5568,
        longitude: 35.8474,
        signalStrength: -72,
        userLoad: 180,
        uploadSpeed: 38.1,
        downloadSpeed: 155.8,
        latency: 28,
        energyConsumption: 62.1,
        batteryType: "Lead-acid",
        batteryCapacity: 150,
        batteryCells: generateBatteryCells(6, false),
        historicalData: generateHistoricalData(30),
        powerSource: "solar"
    },
    {
        id: 'TWR-003',
        name: 'New Zarqa Tower',
        location: 'Zarqa, Jordan',
        status: 'critical',
        latitude: 32.0740,
        longitude: 36.0917,
        signalStrength: -110,
        userLoad: 0,
        uploadSpeed: 0,
        downloadSpeed: 0,
        latency: 0,
        energyConsumption: 5.2,
        batteryType: "Lithium-ion",
        batteryCapacity: 200,
        batteryCells: generateBatteryCells(8, false).map((c)=>({
                ...c,
                voltage: 3.2,
                current: 0,
                stateOfCharge: 5
            })),
        historicalData: generateHistoricalData(30),
        powerSource: "grid"
    },
    {
        id: 'TWR-004',
        name: 'South Beach Tower',
        location: 'Aqaba, Jordan',
        status: 'warning',
        latitude: 29.5321,
        longitude: 35.0078,
        signalStrength: -85,
        userLoad: 75,
        uploadSpeed: 20.5,
        downloadSpeed: 90.3,
        latency: 45,
        energyConsumption: 55.7,
        batteryType: "VRLA",
        batteryCapacity: 180,
        batteryCells: generateBatteryCells(8, true),
        historicalData: generateHistoricalData(30),
        powerSource: "solar"
    },
    {
        id: 'TWR-005',
        name: 'Downtown Tower',
        location: 'Maan, Jordan',
        status: 'normal',
        latitude: 30.1925,
        longitude: 35.7337,
        signalStrength: -68,
        userLoad: 210,
        uploadSpeed: 42.8,
        downloadSpeed: 175.0,
        latency: 25,
        energyConsumption: 71.3,
        batteryType: "Lithium-ion",
        batteryCapacity: 220,
        batteryCells: generateBatteryCells(10, false),
        historicalData: generateHistoricalData(30),
        powerSource: "grid"
    },
    {
        id: 'TWR-006',
        name: 'Citadel Tower',
        location: 'Salt, Jordan',
        status: 'normal',
        latitude: 32.0392,
        longitude: 35.7289,
        signalStrength: -70,
        userLoad: 280,
        uploadSpeed: 50.1,
        downloadSpeed: 210.2,
        latency: 19,
        energyConsumption: 75.0,
        batteryType: "Lead-acid",
        batteryCapacity: 150,
        batteryCells: generateBatteryCells(6, true),
        historicalData: generateHistoricalData(30),
        powerSource: "grid"
    },
    {
        id: 'TWR-007',
        name: 'Mosaic Tower',
        location: 'Madaba, Jordan',
        status: 'normal',
        latitude: 31.7188,
        longitude: 35.7944,
        signalStrength: -62,
        userLoad: 350,
        uploadSpeed: 55.0,
        downloadSpeed: 250.0,
        latency: 18,
        energyConsumption: 80.2,
        batteryType: "Lithium-ion",
        batteryCapacity: 250,
        batteryCells: generateBatteryCells(12, false),
        historicalData: generateHistoricalData(30),
        powerSource: "solar"
    },
    {
        id: 'TWR-008',
        name: 'Moabite Tower',
        location: 'Karak, Jordan',
        status: 'warning',
        latitude: 31.1822,
        longitude: 35.7622,
        signalStrength: -90,
        userLoad: 50,
        uploadSpeed: 15.0,
        downloadSpeed: 70.5,
        latency: 50,
        energyConsumption: 48.9,
        batteryType: "VRLA",
        batteryCapacity: 180,
        batteryCells: generateBatteryCells(8, true),
        historicalData: generateHistoricalData(30),
        powerSource: "grid"
    }
];
const mockAlerts = [
    {
        id: 'ALT-001',
        towerId: 'TWR-003',
        towerName: 'New Zarqa Tower',
        severity: 'critical',
        message: 'Battery Communication Failure. Cannot read cell data.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'ALT-002',
        towerId: 'TWR-004',
        towerName: 'South Beach Tower',
        severity: 'medium',
        message: 'Overtemperature detected in battery bank. Cell #3 at 45°C.',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'ALT-003',
        towerId: 'TWR-002',
        towerName: 'Al-Hashmi Tower',
        severity: 'high',
        message: 'Overcurrent Alert: Discharging at 35A. Check for short circuits.',
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'ALT-004',
        towerId: 'TWR-008',
        towerName: 'Moabite Tower',
        severity: 'medium',
        message: 'Low State of Health (SoH) on Cell #5. Degraded cell requires review.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'ALT-005',
        towerId: 'TWR-006',
        towerName: 'Citadel Tower',
        severity: 'low',
        message: 'Maintenance Due Warning: Next checkup scheduled in 7 days.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'ALT-006',
        towerId: 'TWR-001',
        towerName: 'Khalda Tower',
        severity: 'high',
        message: 'Overvoltage detected on Cell #2. Voltage at 4.25V.',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'ALT-007',
        towerId: 'TWR-007',
        towerName: 'Mosaic Tower',
        severity: 'medium',
        message: 'Undervoltage Alert on battery bank. Main bus at 47.5V.',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'ALT-008',
        towerId: 'TWR-005',
        towerName: 'Downtown Tower',
        severity: 'high',
        message: 'Imbalance detected. Voltage delta between cells > 0.5V.',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
];
}}),
"[project]/src/app/api/towers/[id]/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data.ts [app-route] (ecmascript)");
;
;
async function GET(request, { params }) {
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
  */ // الكود الحالي الذي يستخدم البيانات الوهمية
    const tower = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockTowers"].find((t)=>t.id === params.id);
    if (tower) {
        // يتم إرجاعها كمصفوفة للحفاظ على التوافق مع الصفحة
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json([
            tower
        ]);
    } else {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Tower not found'
        }, {
            status: 404
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__6573bdb6._.js.map