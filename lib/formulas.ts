/**
 * สูตรคำนวณหลักของ Dashboard
 * ทุกฟังก์ชันออกแบบให้นำไปใช้ซ้ำได้และทดสอบง่าย
 */

/** ปริมาณการใช้ผ้าอ้อมต่อปี = ผู้ใช้ × ชิ้น/คน/วัน × 365 */
export function annualConsumption(
  targetUsers: number,
  piecesPerDay: number,
  days = 365
): number {
  return targetUsers * piecesPerDay * days;
}

/** มูลค่าตลาดต่อปี = ปริมาณการใช้ต่อปี × ราคาต่อชิ้น */
export function annualMarketValue(consumption: number, pricePerPiece: number): number {
  return consumption * pricePerPiece;
}

/** Gross Margin = (ราคาขาย - ต้นทุน) / ราคาขาย */
export function grossMargin(sellingPrice: number, cogs: number): number {
  if (sellingPrice <= 0) return 0;
  return (sellingPrice - cogs) / sellingPrice;
}

/** Contribution Margin ต่อชิ้น */
export function contributionMargin(
  sellingPrice: number,
  cogs: number,
  channelFee: number,
  logistics: number,
  promotion: number,
  advertising: number
): number {
  return sellingPrice - cogs - channelFee - logistics - promotion - advertising;
}

/** จุดคุ้มทุน (หน่วย) = ต้นทุนคงที่ / contribution margin ต่อหน่วย */
export function breakEvenUnits(fixedCost: number, cmPerUnit: number): number {
  if (cmPerUnit <= 0) return Infinity;
  return fixedCost / cmPerUnit;
}

/** รายได้ต่อเดือน */
export function monthlyRevenue(unitsPerMonth: number, avgPrice: number): number {
  return unitsPerMonth * avgPrice;
}

/** เงินทุนจมในสต๊อก = ยอดขายต่อเดือน × COGS × จำนวนเดือนที่ถือสต๊อก */
export function inventoryCash(
  monthlyUnits: number,
  cogs: number,
  inventoryMonths: number
): number {
  return monthlyUnits * cogs * inventoryMonths;
}

/** มูลค่าการซื้อซ้ำต่อลูกค้า = มูลค่าซื้อต่อเดือน × จำนวนเดือนที่อยู่กับเรา */
export function repeatPurchaseValue(
  monthlyValue: number,
  retentionMonths: number
): number {
  return monthlyValue * retentionMonths;
}

/** CAC Payback (เดือน) = ต้นทุนหาลูกค้า / กำไรขั้นต้นต่อลูกค้าต่อเดือน */
export function cacPayback(cac: number, monthlyGrossProfit: number): number {
  if (monthlyGrossProfit <= 0) return Infinity;
  return cac / monthlyGrossProfit;
}
