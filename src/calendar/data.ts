/**
 * Datos fijos del calendario: asignación post/historia por índice,
 * temas y copies (mensaje + CTA). Sin web; contacto con teléfono.
 */
export const CONTACTO =
  "WhatsApp y teléfono: 6824-3794. Visítanos en PH Colores de Bellavista, Calle 43, frente a Parque Urracá, Bellavista.";

export const POSTS: readonly string[] = [
  "2zAxpTku.png",
  "752pfrql.png",
  "Ebg5vwDo.png",
  "KN9XlpYQ.png",
  "KrvHUnc4.png",
  "RgVLdABn.png",
  "id6Ms121.png",
  "j4uQv1x2.png",
  "jwMhnBCF.png",
  "lzhFBJfU.png",
  "nBAjmOx6.png",
  "o5I9XwNl.png",
  "otvyPSPc.png",
  "rausefpH.png",
  "sU07KNUT.png",
  "snxI2cVl.png",
  "xNCstICM.png",
  "yFJKBmew.png",
  "zVB6TP29.png",
  "zf3FxKbi.png",
];

export const HISTORIAS: readonly string[] = [
  "1gI16akM.png",
  "31slH0Ow.png",
  "5JnyEdKB.png",
  "5u7QB3c3.png",
  "7GoXjP50.png",
  "ACYQ3x6Q.png",
  "BNEz6nHq.png",
  "ClSNK6mz.png",
  "DxZG6F9J.png",
  "GExYxCH7.png",
  "LMN6f84I.png",
  "O8kVmJbt.png",
  "SAg8ZGqv.png",
  "UF0hTKeX.png",
  "gc9ey7qu.png",
  "j716wwo2.png",
  "pSRLFccx.png",
  "xc4MRc6i.png",
  "xgDXZbkA.png",
  "mtrCzMyM.png",
];

const TEMA_POST: Record<string, string> = {
  "2zAxpTku.png": "auto",
  "752pfrql.png": "auto",
  "Ebg5vwDo.png": "auto",
  "KN9XlpYQ.png": "auto",
  "KrvHUnc4.png": "auto",
  "RgVLdABn.png": "auto",
  "lzhFBJfU.png": "auto",
  "nBAjmOx6.png": "auto",
  "o5I9XwNl.png": "auto",
  "sU07KNUT.png": "auto",
  "xNCstICM.png": "auto",
  "yFJKBmew.png": "auto",
  "zf3FxKbi.png": "auto",
  "id6Ms121.png": "casa",
  "otvyPSPc.png": "casa",
  "snxI2cVl.png": "casa",
  "zVB6TP29.png": "casa",
  "j4uQv1x2.png": "ubicacion",
  "jwMhnBCF.png": "ubicacion",
  "rausefpH.png": "ubicacion",
};

const TEMA_HIST: Record<string, string> = {
  "31slH0Ow.png": "auto",
  "5u7QB3c3.png": "auto",
  "7GoXjP50.png": "auto",
  "ACYQ3x6Q.png": "auto",
  "ClSNK6mz.png": "auto",
  "GExYxCH7.png": "auto",
  "LMN6f84I.png": "auto",
  "UF0hTKeX.png": "auto",
  "gc9ey7qu.png": "auto",
  "j716wwo2.png": "auto",
  "pSRLFccx.png": "auto",
  "xc4MRc6i.png": "auto",
  "1gI16akM.png": "casa",
  "SAg8ZGqv.png": "casa",
  "mtrCzMyM.png": "casa",
  "xgDXZbkA.png": "casa",
  "5JnyEdKB.png": "ubicacion",
  "BNEz6nHq.png": "ubicacion",
  "DxZG6F9J.png": "ubicacion",
  "O8kVmJbt.png": "ubicacion",
};

const COPY_POST: Record<string, [string, string]> = {
  "2zAxpTku.png": [
    "Préstamo con garantía de auto: préstamos claros y seguros. Auto desde 2017, ingreso mín. $1,500.",
    "Solicita tu evaluación",
  ],
  "752pfrql.png": [
    "Préstamos con garantía de auto. Visítanos en Bellavista. Auto desde 2017, ingreso mín. $1,500.",
    "Solicita tu evaluación",
  ],
  "Ebg5vwDo.png": [
    "Cuando surgen gastos inesperados, tenemos la solución: préstamo con garantía de auto. Auto desde 2017, ingreso mín. $1,500.",
    "Solicita tu evaluación",
  ],
  "KN9XlpYQ.png": [
    "Préstamo con garantía de auto: fácil, rápido y seguro. Auto desde 2017, ingreso mín. $1,500.",
    "Solicita tu evaluación",
  ],
  "KrvHUnc4.png": [
    "Convierte tu auto en liquidez. Préstamo con garantía de auto. Auto desde 2017, ingreso mín. $1,500.",
    "Solicita tu evaluación",
  ],
  "RgVLdABn.png": [
    "Cuando el banco tarda... Préstamo con garantía de auto. Auto desde 2017, ingreso mín. $1,500.",
    "Solicita tu evaluación",
  ],
  "id6Ms121.png": [
    "Con tu casa obtén liquidez inmediata. Préstamos claros y seguros, sin trámites complicados.",
    "Solicítalo hoy",
  ],
  "j4uQv1x2.png": [
    "Nuestra oficina en Bellavista. PH Colores de Bellavista. Atención personalizada.",
    "Visítanos hoy",
  ],
  "jwMhnBCF.png": [
    "Tu aliado financiero. Asesoría profesional y personalizada. Bellavista, Panamá.",
    "Visítanos",
  ],
  "lzhFBJfU.png": [
    "¿Necesitas dinero urgente? Préstamo con garantía de auto. Auto desde 2017, ingreso mín. $1,500.",
    "Solicita tu evaluación",
  ],
  "nBAjmOx6.png": [
    "Préstamo con garantía de auto. Respuesta en 48h. Sigue manejando tu auto. Auto desde 2017, ingreso mín. $1,500.",
    "Solicita tu evaluación",
  ],
  "o5I9XwNl.png": [
    "Préstamo con garantía de auto. Proceso transparente. Auto desde 2017, ingreso mín. $1,500.",
    "Solicita tu evaluación",
  ],
  "otvyPSPc.png": [
    "Convierte tu casa en liquidez. Proceso seguro y confiable.",
    "Solicítalo",
  ],
  "rausefpH.png": [
    "Atención personalizada. Te asesoramos paso a paso. Bellavista, Panamá.",
    "Visítanos hoy",
  ],
  "sU07KNUT.png": [
    "Préstamo con garantía de auto. Dinero rápido y seguro. Auto desde 2017, ingreso mín. $1,500.",
    "Solicita tu evaluación",
  ],
  "snxI2cVl.png": [
    "Tu propiedad puede ayudarte. Obtén liquidez sin venderla.",
    "Contáctanos",
  ],
  "xNCstICM.png": [
    "Préstamos con garantía de auto. Tu carro sigue contigo. Aprobación rápida. Auto desde 2017, ingreso mín. $1,500.",
    "Solicita tu evaluación",
  ],
  "yFJKBmew.png": [
    "Préstamo con garantía de auto. Tu auto sigue contigo. Auto desde 2017, ingreso mín. $1,500.",
    "Solicita tu evaluación",
  ],
  "zVB6TP29.png": [
    "Liquidez con tu propiedad. Proceso confiable y seguro.",
    "Solicita información",
  ],
  "zf3FxKbi.png": [
    "¿Necesitas dinero hoy? Préstamo con garantía de auto. Auto desde 2017, ingreso mín. $1,500.",
    "Solicita tu evaluación",
  ],
};

const COPY_HIST: Record<string, [string, string]> = {
  "1gI16akM.png": ["Liquidez con tu casa. Proceso rápido y seguro.", "Solicita información"],
  "31slH0Ow.png": [
    "Préstamo con tu auto. Seguro, rápido y fácil. Auto desde 2017, sujeto a evaluación.",
    "Solicita tu préstamo",
  ],
  "5JnyEdKB.png": [
    "Estamos en Bellavista. PH Colores de Bellavista. Te esperamos hoy.",
    "Contáctanos",
  ],
  "5u7QB3c3.png": [
    "Préstamo con tu auto. Respuesta en 48 horas. Auto desde 2017, sujeto a evaluación.",
    "Solicita tu préstamo",
  ],
  "7GoXjP50.png": [
    "Préstamo con tu auto. Rápido, seguro y transparente. Auto desde 2017, sujeto a evaluación.",
    "Solicita tu préstamo",
  ],
  "ACYQ3x6Q.png": [
    "Préstamo con tu auto. Liquidez inmediata. Auto desde 2017, sujeto a evaluación.",
    "Solicita tu préstamo",
  ],
  "BNEz6nHq.png": [
    "Estamos para ayudarte. Atención directa y personalizada. PH Colores de Bellavista.",
    "Escríbenos",
  ],
  "ClSNK6mz.png": [
    "¿Una emergencia financiera? Préstamo con garantía de auto. Auto desde 2017, sujeto a evaluación.",
    "Solicita tu préstamo",
  ],
  "DxZG6F9J.png": [
    "¡Visítanos! Calle 43, Bellavista. PH Colores de Bellavista.",
    "Te esperamos",
  ],
  "GExYxCH7.png": [
    "¿Necesitas liquidez rápida? Préstamo con garantía de auto. Auto desde 2017, sujeto a evaluación.",
    "Solicita tu préstamo",
  ],
  "LMN6f84I.png": [
    "Préstamo con tu auto. Aprobación rápida, sin trámites complicados. Auto desde 2017, sujeto a evaluación.",
    "Solicita tu préstamo",
  ],
  "O8kVmJbt.png": [
    "Estamos en Bellavista. PH Colores de Bellavista. Calle 43, frente a Parque Urracá.",
    "Te esperamos",
  ],
  "SAg8ZGqv.png": ["¿Propiedad a tu nombre? Podemos ayudarte.", "Escríbenos"],
  "UF0hTKeX.png": [
    "Préstamo con tu auto. Tu auto puede ayudarte. Auto desde 2017, sujeto a evaluación.",
    "Solicita tu préstamo",
  ],
  "gc9ey7qu.png": [
    "Préstamo con tu auto. Liquidez inmediata. Auto desde 2017, sujeto a evaluación.",
    "Solicita tu préstamo",
  ],
  "j716wwo2.png": [
    "Préstamo con tu auto. Tu auto puede ayudarte. Auto desde 2017, sujeto a evaluación.",
    "Solicita tu préstamo",
  ],
  "pSRLFccx.png": [
    "Préstamo con tu auto: 1. Aplica (formulario en línea). 2. Evaluamos (rápido y sin complicaciones). 3. Recibe tu dinero.",
    "Solicita tu préstamo",
  ],
  "xc4MRc6i.png": [
    "¿Necesitas liquidez? Préstamo con garantía de auto. Auto desde 2017, sujeto a evaluación.",
    "Solicita tu préstamo",
  ],
  "xgDXZbkA.png": [
    "¿Tienes propiedad? Convierte tu casa en liquidez.",
    "Contáctanos",
  ],
  "mtrCzMyM.png": ["Tu casa puede ayudarte. Liquidez inmediata.", "Escríbenos"],
};

const DIAS_SEMANA = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"] as const;

export function getTemaPost(filename: string): string {
  return TEMA_POST[filename] ?? "general";
}

export function getTemaHist(filename: string): string {
  return TEMA_HIST[filename] ?? "general";
}

export function getCopyPost(filename: string): [string, string] {
  return COPY_POST[filename] ?? ["", ""];
}

export function getCopyHist(filename: string): [string, string] {
  return COPY_HIST[filename] ?? ["", ""];
}

export function getDiaSemana(weekday: number): string {
  return DIAS_SEMANA[weekday] ?? "";
}
