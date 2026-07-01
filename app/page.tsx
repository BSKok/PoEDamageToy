"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

type CalculatorResult = {
  armourDamageReduction: number;
  effectiveDamageReduction: number;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function formatPercent(decimal: number): string {
  return `${(decimal * 100).toFixed(2)}%`;
}

function formatDecimal(decimal: number): string {
  return decimal.toFixed(4);
}

export default function Home() {
  const [armour, setArmour] = useState("1000");
  const [damage, setDamage] = useState("1000");
  const [armourAppliedPercent, setArmourAppliedPercent] = useState("100");
  const [damageReductionPercent, setDamageReductionPercent] = useState("0");
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedArmour = Number(armour);
    const parsedDamage = Number(damage);
    const parsedArmourAppliedPercent = Number(armourAppliedPercent);
    const parsedDamageReductionPercent = Number(damageReductionPercent);

    if (
      [parsedArmour, parsedDamage, parsedArmourAppliedPercent, parsedDamageReductionPercent].some((value) =>
        Number.isNaN(value),
      )
    ) {
      setError("Please enter valid numbers for all fields.");
      setResult(null);
      return;
    }

    if (parsedArmour < 0 || parsedDamage < 0) {
      setError("Armour and Damage must be 0 or greater.");
      setResult(null);
      return;
    }

    const normalizedArmourApplied = Math.max(parsedArmourAppliedPercent, 0) / 100;
    const effectiveArmour = parsedArmour * normalizedArmourApplied;
    const normalizedDamageReduction = clamp(parsedDamageReductionPercent, 0, 100) / 100;
    const denominator = effectiveArmour + 10 * parsedDamage;
    const armourDamageReduction = denominator === 0 ? 0 : clamp(effectiveArmour / denominator, 0, 1);
    const effectiveDamageReduction = clamp(
      1 - (1 - armourDamageReduction) * (1 - normalizedDamageReduction),
      0,
      1,
    );

    setResult({
      armourDamageReduction,
      effectiveDamageReduction,
    });
    setError("");
  };

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <h1>PoE2 Armour Calculator</h1>
        <p className={styles.muted}>
          Effective Armour = Armour * (% Armour Applied to Damage / 100)
        </p>
        <p className={styles.muted}>
          Armour Damage Reduction = Effective Armour / (Effective Armour + 10 * DMG)
        </p>
        <p className={styles.muted}>Effective Damage Reduction = 1 - (1 - Armour DR) * (1 - Damage Reduction)</p>
      </section>

      <form className={styles.panel} onSubmit={handleCalculate}>
        <div className={styles.grid}>
          <label className={styles.field}>
            Armour
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={armour}
              onChange={(event) => setArmour(event.target.value)}
            />
          </label>

          <label className={styles.field}>
            Damage Reduction (%)
            <input
              type="number"
              inputMode="decimal"
              min="0"
              max="100"
              step="any"
              value={damageReductionPercent}
              onChange={(event) => setDamageReductionPercent(event.target.value)}
            />
          </label>

          <label className={styles.field}>
            % Armour Applied to Damage
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={armourAppliedPercent}
              onChange={(event) => setArmourAppliedPercent(event.target.value)}
            />
          </label>

          <label className={styles.field}>
            Damage
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={damage}
              onChange={(event) => setDamage(event.target.value)}
            />
          </label>
        </div>

        <button className={styles.button} type="submit">
          Calculate
        </button>

        {error ? <p className={styles.error}>{error}</p> : null}
      </form>

      {result ? (
        <section className={styles.panel}>
          <h2>Results</h2>
          <p>
            Armour Damage Reduction: {formatPercent(result.armourDamageReduction)} ({formatDecimal(result.armourDamageReduction)})
          </p>
          <p>
            Effective Damage Reduction: {formatPercent(result.effectiveDamageReduction)} ({formatDecimal(result.effectiveDamageReduction)})
          </p>
        </section>
      ) : null}
    </main>
  );
}
