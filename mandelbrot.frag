// Author: LilTOJustice
// Title: Mandelbrot

#ifdef GL_ES
precision mediump float;
#endif

#define ITERATIONS 20


struct complex {
    float real, imag;
};

int mandelbrot(complex c) {
    complex final = c;
    int count = 0;
    for (int i = 0; i < ITERATIONS; i++) {
        float new_real = final.real*final.real + -1.*final.imag*final.imag + c.real;
        float new_imag = 2.*final.real*final.imag + c.imag;
        final.real = new_real;
		final.imag = new_imag;
        count++;
        if (final.real > 2. || final.imag > 2.) break;
    }
    return count;
}

float u_zoom = 0.25;
vec2 u_pos = vec2(0.3,0.);
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = (gl_FragCoord.xy/u_resolution.xy);
    complex c;
    c.real = (st.x - 0.5)/u_zoom - u_pos.x;
    c.imag = (st.y - 0.5)/u_zoom - u_pos.y;
	float color = 1. - 1./float(ITERATIONS) * float(mandelbrot(c));
    gl_FragColor = vec4(color,color,color,1.0);
}
