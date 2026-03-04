#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera calendario de publicaciones Financiera Mi Casa:
- 20 días laborables desde 2026-03-04
- 1 POST + 1 HISTORIA por día
- Variedad de temas (auto, casa, ubicación)
"""
from datetime import datetime, timedelta
import csv
import os

# Fechas: solo lun-vie desde 2026-03-04
def fechas_laborables(desde, cantidad=20):
    d = datetime.strptime(desde, "%Y-%m-%d")
    fechas = []
    while len(fechas) < cantidad:
        if d.weekday() < 5:  # 0=lun, 4=vie
            fechas.append(d.strftime("%Y-%m-%d"))
        d += timedelta(days=1)
    return fechas

DIAS_SEMANA = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

# Asignación: (fecha_idx, post_archivo, historia_archivo) con variedad de temas
# POSTs: auto=13, casa=4, ubicación=3
# HISTORIAs: auto=12, casa=4, ubicación=4
POSTS = [
    "2zAxpTku.png",   # auto garantía
    "752pfrql.png",   # auto Bellavista
    "Ebg5vwDo.png",   # auto gastos inesperados
    "KN9XlpYQ.png",   # auto garantía
    "KrvHUnc4.png",   # auto familia
    "RgVLdABn.png",   # auto banco tarda
    "id6Ms121.png",   # casa liquidez
    "j4uQv1x2.png",   # oficina Bellavista
    "jwMhnBCF.png",   # aliado financiero
    "lzhFBJfU.png",   # dinero urgente auto
    "nBAjmOx6.png",   # auto 48h
    "o5I9XwNl.png",   # auto proceso transparente
    "otvyPSPc.png",   # casa liquidez
    "rausefpH.png",   # atención personalizada
    "sU07KNUT.png",   # auto garantía
    "snxI2cVl.png",   # propiedad ayuda
    "xNCstICM.png",   # auto familia
    "yFJKBmew.png",   # auto garantía
    "zVB6TP29.png",   # liquidez propiedad
    "zf3FxKbi.png",   # dinero hoy auto
]
HISTORIAS = [
    "1gI16akM.png",   # liquidez casa
    "31slH0Ow.png",   # préstamo auto
    "5JnyEdKB.png",   # Bellavista
    "5u7QB3c3.png",   # auto 48h
    "7GoXjP50.png",   # auto rápido seguro
    "ACYQ3x6Q.png",   # auto liquidez
    "BNEz6nHq.png",   # estamos para ayudarte
    "ClSNK6mz.png",   # emergencia financiera
    "DxZG6F9J.png",   # visítanos Bellavista
    "GExYxCH7.png",   # liquidez rápida
    "LMN6f84I.png",   # auto aprobación rápida
    "O8kVmJbt.png",   # estamos en Bellavista
    "SAg8ZGqv.png",   # propiedad a tu nombre
    "UF0hTKeX.png",   # auto puede ayudarte
    "gc9ey7qu.png",   # auto liquidez
    "j716wwo2.png",   # auto puede ayudarte
    "pSRLFccx.png",   # auto 3 pasos
    "xc4MRc6i.png",   # necesitas liquidez
    "xgDXZbkA.png",   # tienes propiedad
    "mtrCzMyM.png",   # tu casa puede ayudarte
]

# Tema corto para nombre de archivo (auto, casa, ubicacion)
TEMA_POST = {
    "2zAxpTku.png": "auto", "752pfrql.png": "auto", "Ebg5vwDo.png": "auto", "KN9XlpYQ.png": "auto",
    "KrvHUnc4.png": "auto", "RgVLdABn.png": "auto", "lzhFBJfU.png": "auto", "nBAjmOx6.png": "auto",
    "o5I9XwNl.png": "auto", "sU07KNUT.png": "auto", "xNCstICM.png": "auto", "yFJKBmew.png": "auto",
    "zf3FxKbi.png": "auto",
    "id6Ms121.png": "casa", "otvyPSPc.png": "casa", "snxI2cVl.png": "casa", "zVB6TP29.png": "casa",
    "j4uQv1x2.png": "ubicacion", "jwMhnBCF.png": "ubicacion", "rausefpH.png": "ubicacion",
}
TEMA_HIST = {
    "31slH0Ow.png": "auto", "5u7QB3c3.png": "auto", "7GoXjP50.png": "auto", "ACYQ3x6Q.png": "auto",
    "ClSNK6mz.png": "auto", "GExYxCH7.png": "auto", "LMN6f84I.png": "auto", "UF0hTKeX.png": "auto",
    "gc9ey7qu.png": "auto", "j716wwo2.png": "auto", "pSRLFccx.png": "auto", "xc4MRc6i.png": "auto",
    "1gI16akM.png": "casa", "SAg8ZGqv.png": "casa", "mtrCzMyM.png": "casa", "xgDXZbkA.png": "casa",
    "5JnyEdKB.png": "ubicacion", "BNEz6nHq.png": "ubicacion", "DxZG6F9J.png": "ubicacion", "O8kVmJbt.png": "ubicacion",
}

# Copies por archivo (mensaje + CTA). Web y contacto se añaden al final.
COPY_POST = {
    "2zAxpTku.png": ("Préstamo con garantía de auto: préstamos claros y seguros. Auto desde 2017, ingreso mín. $1,500.", "Solicita tu evaluación"),
    "752pfrql.png": ("Préstamos con garantía de auto. Visítanos en Bellavista. Auto desde 2017, ingreso mín. $1,500.", "Solicita tu evaluación"),
    "Ebg5vwDo.png": ("Cuando surgen gastos inesperados, tenemos la solución: préstamo con garantía de auto. Auto desde 2017, ingreso mín. $1,500.", "Solicita tu evaluación"),
    "KN9XlpYQ.png": ("Préstamo con garantía de auto: fácil, rápido y seguro. Auto desde 2017, ingreso mín. $1,500.", "Solicita tu evaluación"),
    "KrvHUnc4.png": ("Convierte tu auto en liquidez. Préstamo con garantía de auto. Auto desde 2017, ingreso mín. $1,500.", "Solicita tu evaluación"),
    "RgVLdABn.png": ("Cuando el banco tarda... Préstamo con garantía de auto. Auto desde 2017, ingreso mín. $1,500.", "Solicita tu evaluación"),
    "id6Ms121.png": ("Con tu casa obtén liquidez inmediata. Préstamos claros y seguros, sin trámites complicados.", "Solicítalo hoy"),
    "j4uQv1x2.png": ("Nuestra oficina en Bellavista. PH Colores de Bellavista. Atención personalizada.", "Visítanos hoy"),
    "jwMhnBCF.png": ("Tu aliado financiero. Asesoría profesional y personalizada. Bellavista, Panamá.", "Visítanos"),
    "lzhFBJfU.png": ("¿Necesitas dinero urgente? Préstamo con garantía de auto. Auto desde 2017, ingreso mín. $1,500.", "Solicita tu evaluación"),
    "nBAjmOx6.png": ("Préstamo con garantía de auto. Respuesta en 48h. Sigue manejando tu auto. Auto desde 2017, ingreso mín. $1,500.", "Solicita tu evaluación"),
    "o5I9XwNl.png": ("Préstamo con garantía de auto. Proceso transparente. Auto desde 2017, ingreso mín. $1,500.", "Solicita tu evaluación"),
    "otvyPSPc.png": ("Convierte tu casa en liquidez. Proceso seguro y confiable.", "Solicítalo"),
    "rausefpH.png": ("Atención personalizada. Te asesoramos paso a paso. Bellavista, Panamá.", "Visítanos hoy"),
    "sU07KNUT.png": ("Préstamo con garantía de auto. Dinero rápido y seguro. Auto desde 2017, ingreso mín. $1,500.", "Solicita tu evaluación"),
    "snxI2cVl.png": ("Tu propiedad puede ayudarte. Obtén liquidez sin venderla.", "Contáctanos"),
    "xNCstICM.png": ("Préstamos con garantía de auto. Tu carro sigue contigo. Aprobación rápida. Auto desde 2017, ingreso mín. $1,500.", "Solicita tu evaluación"),
    "yFJKBmew.png": ("Préstamo con garantía de auto. Tu auto sigue contigo. Auto desde 2017, ingreso mín. $1,500.", "Solicita tu evaluación"),
    "zVB6TP29.png": ("Liquidez con tu propiedad. Proceso confiable y seguro.", "Solicita información"),
    "zf3FxKbi.png": ("¿Necesitas dinero hoy? Préstamo con garantía de auto. Auto desde 2017, ingreso mín. $1,500.", "Solicita tu evaluación"),
}
COPY_HIST = {
    "1gI16akM.png": ("Liquidez con tu casa. Proceso rápido y seguro.", "Solicita información"),
    "31slH0Ow.png": ("Préstamo con tu auto. Seguro, rápido y fácil. Auto desde 2017, sujeto a evaluación.", "Solicita tu préstamo"),
    "5JnyEdKB.png": ("Estamos en Bellavista. PH Colores de Bellavista. Te esperamos hoy.", "Contáctanos"),
    "5u7QB3c3.png": ("Préstamo con tu auto. Respuesta en 48 horas. Auto desde 2017, sujeto a evaluación.", "Solicita tu préstamo"),
    "7GoXjP50.png": ("Préstamo con tu auto. Rápido, seguro y transparente. Auto desde 2017, sujeto a evaluación.", "Solicita tu préstamo"),
    "ACYQ3x6Q.png": ("Préstamo con tu auto. Liquidez inmediata. Auto desde 2017, sujeto a evaluación.", "Solicita tu préstamo"),
    "BNEz6nHq.png": ("Estamos para ayudarte. Atención directa y personalizada. PH Colores de Bellavista.", "Escríbenos"),
    "ClSNK6mz.png": ("¿Una emergencia financiera? Préstamo con garantía de auto. Auto desde 2017, sujeto a evaluación.", "Solicita tu préstamo"),
    "DxZG6F9J.png": ("¡Visítanos! Calle 43, Bellavista. PH Colores de Bellavista.", "Te esperamos"),
    "GExYxCH7.png": ("¿Necesitas liquidez rápida? Préstamo con garantía de auto. Auto desde 2017, sujeto a evaluación.", "Solicita tu préstamo"),
    "LMN6f84I.png": ("Préstamo con tu auto. Aprobación rápida, sin trámites complicados. Auto desde 2017, sujeto a evaluación.", "Solicita tu préstamo"),
    "O8kVmJbt.png": ("Estamos en Bellavista. PH Colores de Bellavista. Calle 43, frente a Parque Urracá.", "Te esperamos"),
    "SAg8ZGqv.png": ("¿Propiedad a tu nombre? Podemos ayudarte.", "Escríbenos"),
    "UF0hTKeX.png": ("Préstamo con tu auto. Tu auto puede ayudarte. Auto desde 2017, sujeto a evaluación.", "Solicita tu préstamo"),
    "gc9ey7qu.png": ("Préstamo con tu auto. Liquidez inmediata. Auto desde 2017, sujeto a evaluación.", "Solicita tu préstamo"),
    "j716wwo2.png": ("Préstamo con tu auto. Tu auto puede ayudarte. Auto desde 2017, sujeto a evaluación.", "Solicita tu préstamo"),
    "pSRLFccx.png": ("Préstamo con tu auto: 1. Aplica (formulario en línea). 2. Evaluamos (rápido y sin complicaciones). 3. Recibe tu dinero.", "Solicita tu préstamo"),
    "xc4MRc6i.png": ("¿Necesitas liquidez? Préstamo con garantía de auto. Auto desde 2017, sujeto a evaluación.", "Solicita tu préstamo"),
    "xgDXZbkA.png": ("¿Tienes propiedad? Convierte tu casa en liquidez.", "Contáctanos"),
    "mtrCzMyM.png": ("Tu casa puede ayudarte. Liquidez inmediata.", "Escríbenos"),
}

WEB = ""  # Sin sitio web
CONTACTO = "WhatsApp y teléfono: 6824-3794. Visítanos en PH Colores de Bellavista, Calle 43, frente a Parque Urracá, Bellavista."

def main():
    fechas = fechas_laborables("2026-03-04", 20)
    rows = []
    renames = []

    for i, fecha in enumerate(fechas):
        d = datetime.strptime(fecha, "%Y-%m-%d")
        dia_sem = DIAS_SEMANA[d.weekday()]
        pref = d.strftime("%Y%m%d")
        post_f = POSTS[i]
        hist_f = HISTORIAS[i]
        t_post = TEMA_POST.get(post_f, "general")
        t_hist = TEMA_HIST.get(hist_f, "general")

        # Nombres nuevos
        post_nuevo = f"{pref}_POST_{t_post}_{i+1:02d}.png"
        hist_nuevo = f"{pref}_HISTORIA_{t_hist}_{i+1:02d}.png"

        msg_post, cta_post = COPY_POST.get(post_f, ("", ""))
        msg_hist, cta_hist = COPY_HIST.get(hist_f, ("", ""))

        bloque_contacto = f"\n\n{WEB}\n{CONTACTO}" if WEB else f"\n\n{CONTACTO}"
        copy_post = f"{msg_post}\n\n{cta_post}{bloque_contacto}"
        copy_hist = f"{msg_hist}\n\n{cta_hist}{bloque_contacto}"

        for tipo, archivo_orig, archivo_nuevo, copy in [
            ("Post", post_f, post_nuevo, copy_post),
            ("Historia", hist_f, hist_nuevo, copy_hist),
        ]:
            rows.append({
                "Fecha publicación": fecha,
                "Día semana": dia_sem,
                "Tipo pieza": tipo,
                "Nombre archivo": archivo_nuevo,
                "Nombre archivo original": archivo_orig,
                "Copy": copy.replace("\n", " "),
                "CTA": cta_post if tipo == "Post" else cta_hist,
                "Web": WEB,
                "Contacto": CONTACTO,
            })
            renames.append((os.path.join("Artes", archivo_orig), os.path.join("Artes", archivo_nuevo)))

    # CSV
    with open("calendario_financiera_mi_casa.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["Fecha publicación", "Día semana", "Tipo pieza", "Nombre archivo", "Nombre archivo original", "Copy", "CTA", "Web", "Contacto"])
        w.writeheader()
        w.writerows(rows)

    # Lista de renombrados para aplicar
    with open("renombres.txt", "w", encoding="utf-8") as f:
        for old, new in renames:
            f.write(f"{old}\t{new}\n")

    print("Calendario y renames generados.")
    return renames

if __name__ == "__main__":
    main()
