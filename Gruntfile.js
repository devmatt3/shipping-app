var weblogic_contents
weblogic_contents  = '<?xml version="1.0" encoding="UTF-8"?>\n';
weblogic_contents += '<weblogic-web-app xmlns:wls="http://xmlns.oracle.com/weblogic/weblogic-web-app" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd http://xmlns.oracle.com/weblogic/weblogic-web-app http://xmlns.oracle.com/weblogic/weblogic-web-app/1.7/weblogic-web-app.xsd">\n';
weblogic_contents += '  <context-root>/test-app</context-root>\n';
weblogic_contents += '<wls:session-descriptor>\n';
weblogic_contents += '<wls:cookie-path>/test-app</wls:cookie-path>\n';
weblogic_contents += '</wls:session-descriptor>\n';
weblogic_contents += '<wls:security-role-assignment>\n';
weblogic_contents += '<wls:role-name>TEST_APP</wls:role-name>\n';
weblogic_contents += '		<!-- <wls:principal-name>AllUsers_Access</wls:principal-name> -->\n';
weblogic_contents += '		<wls:principal-name>WOULD_BE_HERE</wls:principal-name>\n';
weblogic_contents += '	</wls:security-role-assignment>\n';
weblogic_contents += '</weblogic-web-app>';

var webxml_contents
webxml_contents = '<security-constraint>\n';
webxml_contents += '<display-name>TEST_APP</display-name>\n';
webxml_contents += '<web-resource-collection>\n';
webxml_contents += '<web-resource-name>TEST_APP</web-resource-name>\n';
webxml_contents += '<url-pattern>/</url-pattern>\n';
webxml_contents += '</web-resource-collection>\n';
webxml_contents += '<auth-constraint>\n';
webxml_contents += '<description>Test App</description>\n';
webxml_contents += '<role-name>TEST_APP</role-name>\n';
webxml_contents += '</auth-constraint>\n';
webxml_contents += '<user-data-constraint>\n';
webxml_contents += '<transport-guarantee>CONFIDENTIAL</transport-guarantee>\n';
webxml_contents += '</user-data-constraint>\n';
webxml_contents += '</security-constraint>\n';
webxml_contents += '<login-config>\n';
webxml_contents += '<auth-method>BASIC</auth-method>\n';
webxml_contents += '</login-config>\n';
webxml_contents += '<security-role>\n';
webxml_contents += '<role-name>TEST_APP</role-name>\n';
webxml_contents += '</security-role>';
webxml_contents += '<session-config>';
webxml_contents += '<session-timeout>30</session-timeout>';
webxml_contents += '</session-config>';
module.exports = function(grunt) {

    grunt.initConfig({
      
        war: {
            target: {
              options: {
                war_dist_folder: 'war',    /* Folder where to generate the WAR. */
                war_name: 'test-app-ui-1.0.0',  /* The name fo the WAR file (.war will be the extension) */
                war_extras: [ {filename: '/WEB-INF/weblogic.xml', data: weblogic_contents} ],
                webxml_webapp_extras: [webxml_contents]  
              },
              files: [
                {
                  expand: true,
                  cwd: 'dist',
                  src: ['**'],
                  dest: ''
                }
              ]
            }
          }
    
    });
  
    grunt.loadNpmTasks('grunt-war');  
    grunt.registerTask('default', ['war']);
  
  };