@echo off
rem Abre o Dojo no Windows: dois cliques e o navegador abre na sessao de hoje.
rem Deixe esta janela aberta enquanto estuda. Para encerrar: feche a janela.
title Dojo - NestJS, React, TypeScript
cd /d "%~dp0"
if not exist node_modules\typescript (
  echo Primeira vez: instalando a dependencia do Dojo...
  call npm install
)
node servidor.mjs
if errorlevel 1 pause
