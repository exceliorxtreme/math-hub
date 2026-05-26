# core/python_engine.py
import numpy as np
from numba import njit
import time
import sys

@njit(fastmath=True)
def run_sieve_logic(sieve, limit):
    sqrt_limit = int(limit**0.5) + 1
    for i in range(2, sqrt_limit):
        if sieve[i] == 1:
            for j in range(i*i, limit + 1, i):
                sieve[j] = 0

@njit(fastmath=True)
def goldbach_descending_core(two_n, sieve, pair_limit=5):
    pairs = []
    x = two_n - 1 if two_n % 2 == 0 else two_n - 2
    half_n = two_n // 2
    blocked_by_shield = 0
    odd_candidates = 0
    
    while x >= half_n and len(pairs) < pair_limit:
        odd_candidates += 1
        comp = two_n - x
        if sieve[x] == 1 and sieve[comp] == 1:
            pairs.append((x, comp))
        else:
            blocked_by_shield += 1
        x -= 2
    return pairs, odd_candidates, blocked_by_shield

def main():
    print("="*60)
    print("🚀 MOTORUL DE ÎNALTĂ PERFORMANȚĂ GOLDBACH SHIELD (NATIVE CPU)")
    print("="*60)
    
    # Suport pentru argument direct din linia de comandă, altfel cere input interactiv
    if len(sys.argv) > 1:
        try:
            target_2n = int(sys.argv[1])
        except ValueError:
            print("Argument invalid. Introduceți numărul manual.")
            return
    else:
        try:
            user_input = input("Introduceți numărul par țintă (ex: 503222000): ").replace(",", "").replace(".", "").strip()
            target_2n = int(user_input)
        except ValueError:
            print("❌ Eroare: Trebuie să introduceți un număr întreg valid!")
            return

    if target_2n < 4 or target_2n % 2 != 0:
        print("❌ Eroare: Numărul trebuie să fie PAR și mai mare sau egal cu 4!")
        return

    print(f"\n[1/3] Alocare masivă în RAM pentru {target_2n:,} elemente (int8)...")
    t0 = time.perf_counter()
    sieve = np.ones(target_2n + 1, dtype=np.int8)
    sieve[0] = sieve[1] = 0
    t1 = time.perf_counter()
    print(f"      -> Memorie RAM mapată în: {t1 - t0:.4f} secunde.")

    print("\n[2/3] Compilare JIT & Generare Sită Eratosthenes...")
    t2 = time.perf_counter()
    run_sieve_logic(sieve, target_2n)
    t3 = time.perf_counter()
    print(f"      -> Sită calculată în: {t3 - t2:.4f} secunde.")

    print("\n[3/3] Lansare Algoritm Descendent la Granița de Margine...")
    t4 = time.perf_counter()
    perechi, candidati, blocate = goldbach_descending_core(target_2n, sieve, pair_limit=5)
    t5 = time.perf_counter()

    print("\n" + "="*60)
    print("📊 REZULTATE ȘTIINȚIFICE FINALE:")
    print("="*60)
    print(f"  • Ținta Evaluată (2n):      {target_2n:,}")
    print(f"  • Timp Total de Calcul:     {(t3 - t2) + (t5 - t4):.4f} secunde")
    print(f"  • Numere impare verificate: {candidati:,}")
    print(f"  • Scuturi/Bariere locale:   {blocate:,}")
    print("\n✨ PERECHI DE MARGINE IDENTIFICATE:")
    for idx, (p, q) in enumerate(perechi):
        print(f"    [Perechea {idx+1}]  {target_2n:,} = {p:,} + {q:,}")
    print("="*60 + "\n")

if __name__ == "__main__":
    main()
