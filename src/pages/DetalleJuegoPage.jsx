import React from 'react';
import { useParams } from 'react-router-dom';
import JuegoDetalle from '../components/JuegoDetalle';

export default function DetalleJuegoPage(){
  const { id } = useParams();
  return <JuegoDetalle juegoId={id} />;
}
