// src/components/ApiTest.jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { getBusinessCategories, getAllCategories } from '@/services/api';
import { useCategories } from '@/hooks/useCategories';

const ApiTest = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState({});
  const [showJson, setShowJson] = useState({});

  // Hook de categorías para prueba
  const {
    categories: hookCategories,
    loading: hookLoading,
    error: hookError,
    pagination,
    refetch,
    nextPage,
    prevPage,
    currentPage,
    hasNextPage,
    hasPrevPage
  } = useCategories({ autoLoad: false, initialPage: 1, perPage: 5 });

  const runTest = async (testName, testFunction) => {
    setLoading(prev => ({ ...prev, [testName]: true }));
    try {
      const result = await testFunction();
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { success: true, data: result, timestamp: new Date().toISOString() }
      }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { success: false, error: error.message, timestamp: new Date().toISOString() }
      }));
    } finally {
      setLoading(prev => ({ ...prev, [testName]: false }));
    }
  };

  const toggleJson = (testName) => {
    setShowJson(prev => ({ ...prev, [testName]: !prev[testName] }));
  };

  const TestCard = ({ testName, title, description, onTest, result, isLoading }) => (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {result && (
              <Badge variant={result.success ? "default" : "destructive"}>
                {result.success ? (
                  <CheckCircle className="h-4 w-4 mr-1" />
                ) : (
                  <XCircle className="h-4 w-4 mr-1" />
                )}
                {result.success ? 'Éxito' : 'Error'}
              </Badge>
            )}
            <Button 
              onClick={onTest} 
              disabled={isLoading}
              size="sm"
              variant="outline"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {isLoading ? 'Probando...' : 'Probar'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {result && (
          <div className="space-y-4">
            {result.success ? (
              <div className="space-y-2">
                <p className="text-sm text-green-600">
                  ✅ Prueba exitosa - {new Date(result.timestamp).toLocaleTimeString()}
                </p>
                {result.data && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleJson(testName)}
                      >
                        {showJson[testName] ? (
                          <EyeOff className="h-4 w-4 mr-1" />
                        ) : (
                          <Eye className="h-4 w-4 mr-1" />
                        )}
                        {showJson[testName] ? 'Ocultar' : 'Ver'} respuesta
                      </Button>
                    </div>
                    {showJson[testName] && (
                      <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-red-600">
                  ❌ Error - {new Date(result.timestamp).toLocaleTimeString()}
                </p>
                <p className="text-sm text-red-800 bg-red-50 p-2 rounded">
                  {result.error}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-stone-800 mb-2">
          Pruebas de API - Categorías de Negocio
        </h1>
        <p className="text-stone-600">
          Herramienta para probar la integración con la API de categorías
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Prueba 1: Obtener categorías con paginación */}
        <TestCard
          testName="paginated"
          title="Categorías Paginadas"
          description="Obtener categorías con paginación (página 1, 10 items)"
          onTest={() => runTest('paginated', () => getBusinessCategories(1, 10))}
          result={testResults.paginated}
          isLoading={loading.paginated}
        />

        {/* Prueba 2: Obtener todas las categorías */}
        <TestCard
          testName="all"
          title="Todas las Categorías"
          description="Obtener todas las categorías sin paginación"
          onTest={() => runTest('all', () => getAllCategories())}
          result={testResults.all}
          isLoading={loading.all}
        />

        {/* Prueba 3: Hook con paginación pequeña */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Prueba del Hook useCategories</CardTitle>
            <CardDescription>
              Prueba del hook personalizado con paginación (5 items por página)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={() => refetch()}
                  disabled={hookLoading}
                  variant="outline"
                >
                  {hookLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  {hookLoading ? 'Cargando...' : 'Cargar Categorías'}
                </Button>
                
                <Button
                  onClick={prevPage}
                  disabled={!hasPrevPage || hookLoading}
                  variant="outline"
                >
                  ← Anterior
                </Button>
                
                <Button
                  onClick={nextPage}
                  disabled={!hasNextPage || hookLoading}
                  variant="outline"
                >
                  Siguiente →
                </Button>
              </div>

              {hookError && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-red-800 text-sm">
                    ❌ Error: {hookError}
                  </p>
                </div>
              )}

              {pagination && (
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-blue-800 text-sm">
                    📄 Página {currentPage} de {pagination.lastPage} | 
                    Total: {pagination.total} categorías | 
                    Mostrando: {pagination.from}-{pagination.to}
                  </p>
                </div>
              )}

              {hookCategories.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Categorías obtenidas:</h4>
                  <div className="grid gap-2">
                    {hookCategories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center justify-between bg-stone-50 p-3 rounded"
                      >
                        <div>
                          <span className="font-medium">{category.name}</span>
                          {category.description && (
                            <p className="text-sm text-stone-600">
                              {category.description}
                            </p>
                          )}
                        </div>
                        <Badge variant={category.is_active ? "default" : "secondary"}>
                          {category.is_active ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información de la API */}
      <Card>
        <CardHeader>
          <CardTitle>Información de la API</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Endpoint:</h4>
              <code className="text-sm bg-stone-100 p-2 rounded block">
                https://royalblue-chamois-327906.hostingersite.com/public/api/business/category
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Método:</h4>
              <Badge>POST</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Cuerpo de la petición:</h4>
              <pre className="text-sm bg-stone-100 p-2 rounded">
{`{
  "per_page": 10,
  "page": 1
}`}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Headers:</h4>
              <pre className="text-sm bg-stone-100 p-2 rounded">
{`Content-Type: application/json
Accept: application/json`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiTest;