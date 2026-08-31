INSERT INTO images (topic, remote_path, content_type, alt_text) VALUES
  ('logical-ports', 'logical-ports.jpeg', 'image/jpeg', 'Router transmitiendo datos a distintas aplicaciones a través de puertos numerados'),
  ('protocols', 'protocols.jpeg', 'image/jpeg', 'Dos equipos intercambiando datos mediante los protocolos TCP/IP'),
  ('protocols-dns', 'protocols-dns.jpeg', 'image/jpeg', 'Servidor DNS traduciendo un nombre de dominio a una dirección IP'),
  ('osi-model', 'osi-model.jpeg', 'image/jpeg', 'Diagrama de las siete capas del modelo OSI'),
  ('osi-model-physical-layer', 'osi-model-physical-layer.jpeg', 'image/jpeg', 'Detalle de la capa física transmitiendo señales por un cable de red')
ON DUPLICATE KEY UPDATE
  remote_path = VALUES(remote_path),
  content_type = VALUES(content_type),
  alt_text = VALUES(alt_text);
