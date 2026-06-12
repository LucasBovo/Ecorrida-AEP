// ─────────────────────────────────────────────
//  Store global de caronas (simula banco de dados em memória)
//  Permite que OferecerCarona e BuscarCarona compartilhem dados
// ─────────────────────────────────────────────

import { CaronaOferta, Coordenada } from '../utils/knn';

// Coordenadas reais de Maringá – PR
export const DESTINOS_PADRAO: Array<{ nome: string; coord: Coordenada }> = [
  { nome: 'UniCesumar – Campus Sede',    coord: { latitude: -23.4139, longitude: -51.9388 } },
  { nome: 'Terminal Urbano de Maringá',  coord: { latitude: -23.4252, longitude: -51.9380 } },
  { nome: 'Shopping Catuaí Maringá',     coord: { latitude: -23.4095, longitude: -51.9695 } },
  { nome: 'Parque do Ingá',              coord: { latitude: -23.4189, longitude: -51.9270 } },
  { nome: 'Zona 7 – Centro de Maringá',  coord: { latitude: -23.4205, longitude: -51.9332 } },
  { nome: 'UEM – Universidade Estadual', coord: { latitude: -23.3973, longitude: -51.9128 } },
  { nome: 'Hospital Universitário',      coord: { latitude: -23.4160, longitude: -51.9428 } },
  { nome: 'Aeroporto de Maringá',        coord: { latitude: -23.4782, longitude: -52.0121 } },
];

// Caronas mockadas iniciais com coordenadas reais de Maringá
const CARONAS_INICIAIS: CaronaOferta[] = [
  {
    id: 'c001',
    motorista: 'Ana Silva',
    ra: '25360001-2',
    veiculo: 'Chevrolet Onix 2022 – Branco',
    origemNome: 'UniCesumar – Campus Sede',
    origemCoord: { latitude: -23.4139, longitude: -51.9388 },
    destinoNome: 'Terminal Urbano de Maringá',
    destinoCoord: { latitude: -23.4252, longitude: -51.9380 },
    horario: '07:30',
    vagas: 3,
    preco: 6,
    rating: 4.9,
  },
  {
    id: 'c002',
    motorista: 'Lucas Mendes',
    ra: '25360045-2',
    veiculo: 'VW Gol 2021 – Prata',
    origemNome: 'UniCesumar – Campus Sede',
    origemCoord: { latitude: -23.4145, longitude: -51.9395 },
    destinoNome: 'Shopping Catuaí Maringá',
    destinoCoord: { latitude: -23.4095, longitude: -51.9695 },
    horario: '12:15',
    vagas: 2,
    preco: 8,
    rating: 4.7,
  },
  {
    id: 'c003',
    motorista: 'Fernanda Rocha',
    ra: '25360112-2',
    veiculo: 'Fiat Argo 2023 – Vermelho',
    origemNome: 'UniCesumar – Campus Sede',
    origemCoord: { latitude: -23.4135, longitude: -51.9380 },
    destinoNome: 'Zona 7 – Centro de Maringá',
    destinoCoord: { latitude: -23.4205, longitude: -51.9332 },
    horario: '18:00',
    vagas: 3,
    preco: 5,
    rating: 5.0,
  },
  {
    id: 'c004',
    motorista: 'Rafael Costa',
    ra: '25360078-2',
    veiculo: 'Hyundai HB20 2022 – Azul',
    origemNome: 'UEM – Universidade Estadual',
    origemCoord: { latitude: -23.3975, longitude: -51.9130 },
    destinoNome: 'Terminal Urbano de Maringá',
    destinoCoord: { latitude: -23.4252, longitude: -51.9380 },
    horario: '07:45',
    vagas: 4,
    preco: 7,
    rating: 4.6,
  },
  {
    id: 'c005',
    motorista: 'Juliana Martins',
    ra: '25360233-2',
    veiculo: 'Renault Kwid 2023 – Laranja',
    origemNome: 'Parque do Ingá',
    origemCoord: { latitude: -23.4189, longitude: -51.9270 },
    destinoNome: 'UniCesumar – Campus Sede',
    destinoCoord: { latitude: -23.4139, longitude: -51.9388 },
    horario: '13:00',
    vagas: 2,
    preco: 5,
    rating: 4.8,
  },
  {
    id: 'c006',
    motorista: 'Diego Alves',
    ra: '25360301-2',
    veiculo: 'Toyota Corolla 2021 – Preto',
    origemNome: 'UniCesumar – Campus Sede',
    origemCoord: { latitude: -23.4142, longitude: -51.9391 },
    destinoNome: 'Aeroporto de Maringá',
    destinoCoord: { latitude: -23.4782, longitude: -52.0121 },
    horario: '06:00',
    vagas: 3,
    preco: 18,
    rating: 4.9,
  },
  {
    id: 'c007',
    motorista: 'Camila Souza',
    ra: '25360199-2',
    veiculo: 'Fiat Pulse 2024 – Cinza',
    origemNome: 'UniCesumar – Campus Sede',
    origemCoord: { latitude: -23.4138, longitude: -51.9385 },
    destinoNome: 'Hospital Universitário',
    destinoCoord: { latitude: -23.4160, longitude: -51.9428 },
    horario: '17:30',
    vagas: 2,
    preco: 4,
    rating: 4.5,
  },
];

// ── Store mutável em memória ──
let _caronas: CaronaOferta[] = [...CARONAS_INICIAIS];
let _matches: Array<{ caronaId: string; solicitanteNome: string; status: 'aguardando' | 'confirmada' }> = [
  { caronaId: 'c001', solicitanteNome: 'Você', status: 'aguardando' },
];

export const CaronasStore = {
  getCaronas(): CaronaOferta[] {
    return [..._caronas];
  },

  addCarona(carona: CaronaOferta): void {
    _caronas = [carona, ..._caronas];
  },

  getMatches() {
    return [..._matches];
  },

  addMatch(caronaId: string, solicitanteNome: string) {
    const jaExiste = _matches.find(m => m.caronaId === caronaId);
    if (!jaExiste) {
      _matches = [{ caronaId, solicitanteNome, status: 'aguardando' }, ..._matches];
    }
  },

  confirmarMatch(caronaId: string) {
    _matches = _matches.map(m =>
      m.caronaId === caronaId ? { ...m, status: 'confirmada' } : m
    );
  },

  cancelarMatch(caronaId: string) {
    _matches = _matches.filter(m => m.caronaId !== caronaId);
  },

  getCaronaById(id: string): CaronaOferta | undefined {
    return _caronas.find(c => c.id === id);
  },
};
