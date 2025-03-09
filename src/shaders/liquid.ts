export const liquidVertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vPosition = position;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const liquidFragmentShader = `
  uniform vec3 color;
  uniform float fillLevel;
  uniform float opacity;
  uniform float modelMinY;
  uniform float modelMaxY;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    float heightFactor = (vPosition.y - modelMinY) / (modelMaxY - modelMinY);
    
    if (heightFactor > fillLevel) {
      discard;
    }
    
    float wave = sin(vPosition.x * 10.0 + vPosition.z * 10.0 + fillLevel * 10.0) * 0.05;
    
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnelFactor = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);
    
    vec3 finalColor = mix(color, vec3(1.0), fresnelFactor * 0.5);
    
    gl_FragColor = vec4(finalColor, opacity);
  }
`; 