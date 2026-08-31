INSERT INTO images (topic, remote_path, content_type, alt_text) VALUES
  ('logical-ports', 'logical-ports.png', 'image/png', 'Diagrama ilustrativo de rangos de puertos lógicos'),
  ('protocols', 'protocols.png', 'image/png', 'Íconos representativos de distintos protocolos de red'),
  ('osi-model', 'osi-model.png', 'image/png', 'Diagrama de las siete capas del modelo OSI')
ON DUPLICATE KEY UPDATE
  remote_path = VALUES(remote_path),
  content_type = VALUES(content_type),
  alt_text = VALUES(alt_text);
