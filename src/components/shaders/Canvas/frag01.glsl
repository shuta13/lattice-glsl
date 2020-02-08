precision mediump float;
uniform vec2  m;       // mouse
uniform float t;       // time
uniform vec2  r;       // resolution

void main(void){
    vec2 p = (gl_FragCoord.xy * 10.0 - r) / min(r.x, r.y);
    float l = length(vec2(0, sin(p.y + m.y * 0.01) + sin(p.x - m.x * 0.01)));
    gl_FragColor = vec4(vec3(l), 1.0);
}