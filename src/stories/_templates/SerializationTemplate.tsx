/**
 * SerializationTemplate - Reusable template for component serialization demos
 * 
 * Creates standardized serialization stories that demonstrate:
 * - Component serialization to JSON
 * - JSON deserialization back to component
 * - Round-trip validation
 * - JSON structure visualization
 * 
 * Usage:
 * ```tsx
 * import { makeSerializationStory } from '../_templates/SerializationTemplate';
 * 
 * export const SerializationDemo = makeSerializationStory(() => (
 *   <Button variant="primary" label="Click Me" />
 * ));
 * ```
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { registerSerializableComponents } from '../../schemas/transformers/registry';
import { Code } from '../../components/blocks/Code';
import { Box, Typography } from '@mui/material';

// Ensure all serializable components are registered
registerSerializableComponents();

/**
 * Creates a serialization demo story for any React element
 * 
 * @param makeElement - Function that returns the React element to serialize
 * @returns Story component that demonstrates serialization round-trip
 */
export const makeSerializationStory = (makeElement: () => React.ReactElement) => () => {
  const element = makeElement();
  
  let serialized: string;
  let roundTrip: React.ReactNode;
  let error: string | null = null;
  
  try {
    // Serialize the element to JSON
    serialized = ComponentTransformer.serialize(element);
    
    // Deserialize back to component
    roundTrip = ComponentTransformer.deserialize(serialized);
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
    serialized = '{}';
    roundTrip = <div style={{ color: 'red', padding: '16px' }}>Serialization Error: {error}</div>;
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Original Component */}
      <Box>
        <Typography variant="h6" component="h3" gutterBottom>
          Original Component
        </Typography>
        <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          {element}
        </Box>
      </Box>
      
      {/* Round-trip Component */}
      <Box>
        <Typography variant="h6" component="h3" gutterBottom>
          Deserialized Component (Round-trip)
        </Typography>
        <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          {roundTrip}
        </Box>
      </Box>
      
      {/* Serialized JSON */}
      <Box>
        <Typography variant="h6" component="h3" gutterBottom>
          Serialized JSON
        </Typography>
        {error ? (
          <Box sx={{ p: 2, bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 1 }}>
            <Typography variant="body2">Error: {error}</Typography>
          </Box>
        ) : (
          <Code 
            language="json" 
            content={JSON.stringify(JSON.parse(serialized), null, 2)}
            showCopy={true}
            showLineNumbers={true}
            wrapLines={false}
          />
        )}
      </Box>
      
      {/* Metadata */}
      <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary">
          <strong>How it works:</strong><br />
          1. The original component is serialized to JSON using ComponentTransformer<br />
          2. The JSON is then deserialized back into a React component<br />
          3. Both components should render identically, proving serialization fidelity<br />
          4. The JSON shows the exact structure stored for the component
        </Typography>
      </Box>
    </Box>
  );
};

/**
 * Creates a batch serialization demo for multiple elements
 * 
 * @param makeElements - Function that returns array of React elements to serialize
 * @returns Story component that demonstrates batch serialization
 */
export const makeBatchSerializationStory = (makeElements: () => React.ReactElement[]) => () => {
  const elements = makeElements();
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Batch Serialization Demo
      </Typography>
      
      {elements.map((element, index) => {
        const StoryComponent = makeSerializationStory(() => element);
        return (
          <Box key={index} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Component #{index + 1}: {element.type?.toString() || 'Unknown'}
            </Typography>
            <StoryComponent />
          </Box>
        );
      })}
    </Box>
  );
};

/**
 * Creates a complex serialization demo with nested components
 * 
 * @param makeComplexElement - Function that returns a complex nested React element
 * @returns Story component that demonstrates nested component serialization
 */
export const makeComplexSerializationStory = (makeComplexElement: () => React.ReactElement) => () => {
  const ComplexStory = makeSerializationStory(makeComplexElement);
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
        <Typography variant="body2" color="info.contrastText">
          <strong>Complex Serialization:</strong> This demo shows how nested components with multiple
          levels of children are serialized and deserialized while maintaining their structure and behavior.
        </Typography>
      </Box>
      
      <ComplexStory />
    </Box>
  );
};

export default makeSerializationStory;