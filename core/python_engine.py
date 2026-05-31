# core/python_engine.py
import numpy as np
from numba import njit
import time
import sys

@njit(fastmath=True)
def is_prime_fast(n, small_primes):
    """Verifică rapid dacă un număr este prim folosind vectorul de numere prime mici."""
    if n < 2:
        return False
    # Verificăm până la rădăcina pătrată a lui n
    for p in small_primes:
        if p * p > n:
            break
        if n % p == 0:
            return False
    return True

@njit(fastmath=True)
def goldbach_descending_core(two_n, small_primes, pair_limit=10):
    """Caută descendent perechile Goldbach folosind testul rapid de divizibilitate."""
    pairs = []
    x = two_n - 1 if two_n % 2 == 0 else two_n - 2
    half_n = two_n // 2
    blocked_by_shield = 0
    odd_candidates = 0
    
    while x >= half_n and len(pairs) < pair_limit:
        odd_candidates += 1
        comp = two_n - x
        
        # Testăm întâi x (numărul mare), apoi complementul mai mic
        if is_prime_fast(x, small_primes) and is_prime_fast(comp, small_primes):
            pairs.append((x, comp))
        else:
            blocked_by_shield += 1
        x -= 2
        
    return pairs, odd_candidates, blocked_by_shield

def generate_small_primes(limit):
    """Generează numerele prime până la limita specificată folosind un ciur local eficient."""
    sieve = np.ones(limit + 1, dtype=np.bool_)
    sieve[0] = sieve[1] = False
    for i in range(2, int(limit**0.5) + 1):
        if sieve[i]:
            sieve[i*i::i] = False
    return np.nonzero(sieve)[0]

def main():
    print("="*60)
    print("🚀 MOTORUL DE ÎNALTĂ PERFORMANȚĂ GOLDBACH SHIELD (NATIVE CPU)")
    print("="*60)
    
    # Suport pentru argument direct din linia de comandă
    if len(sys.argv) > 1:
        try:
            target_2n = int(sys.argv[1])
        except ValueError:
            print("❌ Argument invalid. Introduceți numărul manual.")
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

    # Pragul maxim pentru radical
    sqrt_limit = int(target_2n**0.5) + 1

    print(f"\n[1/3] Generare Scut Matematic (numere prime până la {sqrt_limit:,})...")
    t0 = time.perf_counter()
    small_primes = generate_small_primes(sqrt_limit)
    t1 = time.perf_counter()
    print(f"      -> Scut generat în: {t1 - t0:.4f} secunde. Dimensiune scut: {len(small_primes):,} numere prime.")

    print("\n[2/3] Compilare JIT și pregătire nucleu nativ...")
    # Trigger-uim o compilare rapidă de încălzire ca Numba să își facă cache-ul JIT
    _ = is_prime_fast(4, small_primes)

    print("\n[3/3] Lansare Algoritm Descendent la Granița de Margine...")
    t4 = time.perf_counter()
    # Setat pair_limit=10 conform noilor specificații din UI!
    perechi, candidati, blocate = goldbach_descending_core(target_2n, small_primes, pair_limit=10)
    t5 = time.perf_counter()

    print("\n" + "="*60)
    print("📊 REZULTATE ȘTIINȚIFICE FINALE:")
    print("="*60)
    print(f"  • Ținta Evaluată (2n):      {target_2n:,}")
    print(f"  • Timp Total de Calcul:      {t5 - t4:.4f} secunde")
    print(f"  • Numere impare verificate: {candidati:,}")
    print(f"  • Scuturi/Bariere blocate:  {blocate:,}")
    print("\n✨ PERECHI DE MARGINE IDENTIFICATE:")
    for idx, (p, q) in enumerate(perechi):
        print(f"    [Perechea {idx+1:02d}]  {target_2n:,} = {p:,} + {q:,}")
    print("="*60 + "\n")

if __name__ == "__main__":
    main()
