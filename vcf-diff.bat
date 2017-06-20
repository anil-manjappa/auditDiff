@echo off
echo Running VCF-Audit-Diff jar
set /p loc=Enter the location of Audit-diff jar :
echo Jar location is %loc% & pause
set /p javaloc=Enter the path for JAVA bin directory :
echo JAVA Home directory is %javaloc% & pause
set path=%PATH%;%javaloc%
echo Executing jar file
java -jar %loc%\vcf-audit-diff-1.0.jar
pause