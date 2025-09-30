#!/bin/sh

echo "⏳ Aguardando o banco de dados..."

echo $DB_HOST $DB_PORT $DB_USER
until pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER > /dev/null 2>&1; do
  sleep 1
done

echo "✅ Banco de dados disponível. Rodando migrations e seeds..."

node ace migration:run
node ace db:seed

echo "🚀 Iniciando servidor AdonisJS..."
node build/bin/server.js