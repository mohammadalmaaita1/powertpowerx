export type TowerStatus = "normal" | "warning" | "critical";
export type PowerSource = "grid" | "solar";

export type PerformanceData = {
  date: string;
  signalStrength: number;
  userLoad: number;
  uploadSpeed: number;
  downloadSpeed: number;
  energyConsumption: number;
  stateOfCharge: number;
  voltage: number;
};

export type BatteryCell = {
  id: number;
  voltage: number; // in V
  current: number; // in A (positive for charging, negative for discharging)
  stateOfCharge: number; // in %
  temperature: number; // in °C
  internalResistance: number; // in mΩ
};

export type Tower = {
  id: string;
  name: string;
  location: string;
  status: TowerStatus;
  latitude: number;
  longitude: number;
  signalStrength: number; // in dBm
  userLoad: number;
  uploadSpeed: number; // in Mbps
  downloadSpeed: number; // in Mbps
  latency: number; // in ms
  energyConsumption: number; // in kWh
  batteryType: string; // e.g., "Lithium-ion", "Lead-acid"
  batteryCapacity: number; // in Ah (Ampere-hour)
  batteryCells: BatteryCell[];
  historicalData: PerformanceData[];
  powerSource: PowerSource;
};

export type Alert = {
  id: string;
  towerId: string;
  towerName: string;
  severity: "critical" | "high" | "medium" | "low";
  message: string;
  timestamp: string;
};
