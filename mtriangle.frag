#version 400 compatibility
in vec3 gNs;
in vec3 gLs;
in vec3 gEs;
uniform float uKa, uKd, uKs;
uniform vec4 uColor;
uniform vec4 uSpecularColor;
uniform float uShininess;
void
main( )
{

	vec3 Normal;
	vec3 Light;
	vec3 Eye;
	
	Normal = normalize(gNs);
	Light = normalize(gLs);
	Eye = normalize(gEs);
	
	vec4 ambient = uKa * uColor;
	vec4 diffuse = uKd * uColor;

	float s = 0.;
	if(dot(Normal,Light) > 0.)
	{
		vec3 ref = normalize(2. * Normal * dot(Normal,Light) - Light);
		s = pow(max(dot(Eye,ref),0.),uShininess);
	}

	vec4 specular = uKs * s * uSpecularColor;

	gl_FragColor = vec4(ambient.rgb + diffuse.rgb + specular.rgb, 1.);
}