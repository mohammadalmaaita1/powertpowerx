module.exports = {

"[project]/src/lib/mock-data.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
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
            energyConsumption: 50 + Math.floor(Math.random() * 25)
        });
    }
    return data;
}
const mockTowers = [
    {
        id: 'TWR-001',
        name: 'Khalda Tower',
        location: 'Amman, Jordan',
        status: 'active',
        latitude: 31.9876,
        longitude: 35.8437,
        signalStrength: -65,
        userLoad: 235,
        uploadSpeed: 45.2,
        downloadSpeed: 180.5,
        latency: 22,
        energyConsumption: 68.5,
        historicalData: generateHistoricalData(30)
    },
    {
        id: 'TWR-002',
        name: 'Al-Hashmi Tower',
        location: 'Irbid, Jordan',
        status: 'active',
        latitude: 32.5568,
        longitude: 35.8474,
        signalStrength: -72,
        userLoad: 180,
        uploadSpeed: 38.1,
        downloadSpeed: 155.8,
        latency: 28,
        energyConsumption: 62.1,
        historicalData: generateHistoricalData(30)
    },
    {
        id: 'TWR-003',
        name: 'New Zarqa Tower',
        location: 'Zarqa, Jordan',
        status: 'inactive',
        latitude: 32.0740,
        longitude: 36.0917,
        signalStrength: -110,
        userLoad: 0,
        uploadSpeed: 0,
        downloadSpeed: 0,
        latency: 0,
        energyConsumption: 5.2,
        historicalData: generateHistoricalData(30)
    },
    {
        id: 'TWR-004',
        name: 'South Beach Tower',
        location: 'Aqaba, Jordan',
        status: 'maintenance',
        latitude: 29.5321,
        longitude: 35.0078,
        signalStrength: -85,
        userLoad: 75,
        uploadSpeed: 20.5,
        downloadSpeed: 90.3,
        latency: 45,
        energyConsumption: 55.7,
        historicalData: generateHistoricalData(30)
    },
    {
        id: 'TWR-005',
        name: 'Downtown Tower',
        location: 'Maan, Jordan',
        status: 'active',
        latitude: 30.1925,
        longitude: 35.7337,
        signalStrength: -68,
        userLoad: 210,
        uploadSpeed: 42.8,
        downloadSpeed: 175.0,
        latency: 25,
        energyConsumption: 71.3,
        historicalData: generateHistoricalData(30)
    },
    {
        id: 'TWR-006',
        name: 'Citadel Tower',
        location: 'Salt, Jordan',
        status: 'active',
        latitude: 32.0392,
        longitude: 35.7289,
        signalStrength: -70,
        userLoad: 280,
        uploadSpeed: 50.1,
        downloadSpeed: 210.2,
        latency: 19,
        energyConsumption: 75.0,
        historicalData: generateHistoricalData(30)
    },
    {
        id: 'TWR-007',
        name: 'Mosaic Tower',
        location: 'Madaba, Jordan',
        status: 'active',
        latitude: 31.7188,
        longitude: 35.7944,
        signalStrength: -62,
        userLoad: 350,
        uploadSpeed: 55.0,
        downloadSpeed: 250.0,
        latency: 18,
        energyConsumption: 80.2,
        historicalData: generateHistoricalData(30)
    },
    {
        id: 'TWR-008',
        name: 'Moabite Tower',
        location: 'Karak, Jordan',
        status: 'maintenance',
        latitude: 31.1822,
        longitude: 35.7622,
        signalStrength: -90,
        userLoad: 50,
        uploadSpeed: 15.0,
        downloadSpeed: 70.5,
        latency: 50,
        energyConsumption: 48.9,
        historicalData: generateHistoricalData(30)
    }
];
const mockAlerts = [
    {
        id: 'ALT-001',
        towerId: 'TWR-003',
        towerName: 'New Zarqa Tower',
        severity: 'critical',
        message: 'Complete network outage. No signal.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'ALT-002',
        towerId: 'TWR-004',
        towerName: 'South Beach Tower',
        severity: 'medium',
        message: 'Scheduled maintenance started. Intermittent service expected.',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'ALT-003',
        towerId: 'TWR-002',
        towerName: 'Al-Hashmi Tower',
        severity: 'high',
        message: 'High user load detected. Performance may be affected.',
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'ALT-004',
        towerId: 'TWR-008',
        towerName: 'Moabite Tower',
        severity: 'low',
        message: 'Minor signal fluctuation detected during off-peak hours.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    }
];
}}),

};

//# sourceMappingURL=src_lib_mock-data_ts_ee55eaf3._.js.map