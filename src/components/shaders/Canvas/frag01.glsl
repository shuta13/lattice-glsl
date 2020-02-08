precision mediump float;
// uniform vec2  m;       // mouse
uniform float t;       // time
uniform vec2  r;       // resolution

const float PI  = 3.14;
const float PI2 = PI* 2.;

void main(void){
    vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);
    float l = length(vec2( 0, p.y + sin(p.x + t)));
    gl_FragColor = vec4(vec3(l), 1.0);
}