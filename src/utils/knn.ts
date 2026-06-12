// ─────────────────────────────────────────────
//  KNN – K-Nearest Neighbours para matching de caronas
//  Atributos: localização de origem (lat/lng), horário, destino
// ─────────────────────────────────────────────

export interface Coordenada {
  latitude: number;
  longitude: number;
}

export interface CaronaOferta {
  id: string;
  motorista: string;
  ra: string;
  veiculo: string;
  origemNome: string;
  origemCoord: Coordenada;
  destinoNome: string;
  destinoCoord: Coordenada;
  horario: string; // "HH:MM"
  vagas: number;
  preco: number;
  rating: number;
}

export interface PerfilBusca {
  origemCoord: Coordenada;
  destinoNome: string;
  destinoCoord: Coordenada;
  horario: string;
}

export interface KNNResultado {
  carona: CaronaOferta;
  distanciaTotal: number;      // distância euclidiana normalizada
  scoreLocalizacao: number;    // 0–100
  scoreHorario: number;        // 0–100
  scoreDestino: number;        // 0–100
  scoreGeral: number;          // 0–100 (média ponderada)
}

// ── Haversine: km entre dois pontos geográficos ──
function haversineKm(a: Coordenada, b: Coordenada): number {
  const R = 6371;
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
  const sinLat = Math.sin(dLat / 2);
  const sinLon = Math.sin(dLon / 2);
  const c =
    sinLat * sinLat +
    Math.cos((a.latitude * Math.PI) / 180) *
      Math.cos((b.latitude * Math.PI) / 180) *
      sinLon *
      sinLon;
  return R * 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
}

// ── Converte "HH:MM" em minutos desde meia-noite ──
function horarioEmMinutos(h: string): number {
  const [hh, mm] = h.split(":").map(Number);
  return (hh || 0) * 60 + (mm || 0);
}

// ── Normaliza uma distância em km para score 0-100 ──
// maxKm define o pior caso (100% de distância = 0 pontos)
function kmParaScore(km: number, maxKm: number): number {
  const score = Math.max(0, 1 - km / maxKm) * 100;
  return Math.round(score);
}

// ── Levenshtein simplificado para comparar nomes de destino ──
function similaridadeDestino(a: string, b: string): number {
  const na = a.toLowerCase().trim();
  const nb = b.toLowerCase().trim();
  if (na === nb) return 100;
  // verifica se um contém o outro
  if (na.includes(nb) || nb.includes(na)) return 85;
  // distância geográfica do destino como fallback (calculada externamente)
  return 0;
}

// ── KNN principal ──
export function knnMatchCaronas(
  busca: PerfilBusca,
  ofertas: CaronaOferta[],
  k: number = 5
): KNNResultado[] {
  const MAX_KM_ORIGEM = 15;   // 15 km = score 0 em localização
  const MAX_MIN_HORARIO = 90; // 90 min de diferença = score 0 em horário
  const MAX_KM_DESTINO = 20;  // 20 km = score 0 em destino

  // Pesos dos atributos (soma = 1)
  const W_LOCAL = 0.40;
  const W_HORA  = 0.35;
  const W_DEST  = 0.25;

  const buscaMin = horarioEmMinutos(busca.horario);

  const resultados: KNNResultado[] = ofertas.map((carona) => {
    // 1. Score de localização (origem)
    const kmOrigem = haversineKm(busca.origemCoord, carona.origemCoord);
    const scoreLocalizacao = kmParaScore(kmOrigem, MAX_KM_ORIGEM);

    // 2. Score de horário
    const diffMin = Math.abs(horarioEmMinutos(carona.horario) - buscaMin);
    const scoreHorario = Math.round(
      Math.max(0, 1 - diffMin / MAX_MIN_HORARIO) * 100
    );

    // 3. Score de destino (nome + coordenada)
    const scoreNome = similaridadeDestino(busca.destinoNome, carona.destinoNome);
    const kmDestino = haversineKm(busca.destinoCoord, carona.destinoCoord);
    const scoreCoordDest = kmParaScore(kmDestino, MAX_KM_DESTINO);
    const scoreDestino = Math.round(scoreNome > 0 ? (scoreNome * 0.5 + scoreCoordDest * 0.5) : scoreCoordDest);

    // 4. Score geral ponderado
    const scoreGeral = Math.round(
      scoreLocalizacao * W_LOCAL +
      scoreHorario * W_HORA +
      scoreDestino * W_DEST
    );

    // Distância euclidiana normalizada (para ordenação KNN)
    const dLocal = kmOrigem / MAX_KM_ORIGEM;
    const dHora  = diffMin / MAX_MIN_HORARIO;
    const dDest  = kmDestino / MAX_KM_DESTINO;
    const distanciaTotal = Math.sqrt(
      W_LOCAL * dLocal * dLocal +
      W_HORA  * dHora  * dHora  +
      W_DEST  * dDest  * dDest
    );

    return {
      carona,
      distanciaTotal,
      scoreLocalizacao,
      scoreHorario,
      scoreDestino,
      scoreGeral,
    };
  });

  // Ordena pelos k vizinhos mais próximos (menor distância = melhor match)
  return resultados
    .sort((a, b) => a.distanciaTotal - b.distanciaTotal)
    .slice(0, k);
}
