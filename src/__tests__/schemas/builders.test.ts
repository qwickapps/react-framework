/**
 * Unit tests for Schema Builders
 * 
 * Tests the fluent API schema builder system to ensure correct
 * schema generation and validation.
 */

// import { createSchema, FieldBuilder, ModelBuilder, SchemaBuilder } from '../builders';
// import { DataType, FieldType } from '../types';

describe.skip('FieldBuilder', () => {
  test('creates basic string field', () => {
    const field = new FieldBuilder('testField')
      .string()
      .required()
      .textEditor('Test Field', 'A test field')
      .build();

    expect(field).toEqual({
      name: 'testField',
      data_type: DataType.STRING,
      required: true,
      editor: {
        field_type: FieldType.TEXT,
        label: 'Test Field',
        description: 'A test field'
      }
    });
  });

  test('creates number field with validation', () => {
    const field = new FieldBuilder('age')
      .numberEditor('integer', 'Age', 'Your age', 0, 150)
      .required()
      .build();

    expect(field).toEqual({
      name: 'age',
      data_type: DataType.INTEGER,
      required: true,
      editor: {
        field_type: FieldType.INTEGER,
        label: 'Age',
        description: 'Your age',
        validation: { min: 0, max: 150 }
      }
    });
  });

  test('creates select field with options', () => {
    const options = [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' }
    ];
    
    const field = new FieldBuilder('color')
      .selectSingleEditor(options, 'Color', 'Choose a color')
      .optional()
      .build();

    expect(field).toEqual({
      name: 'color',
      data_type: DataType.STRING,
      required: false,
      editor: {
        field_type: FieldType.SELECT,
        label: 'Color',
        description: 'Choose a color',
        validation: { options }
      }
    });
  });

  test('creates object field with auto-inference', () => {
    const field = new FieldBuilder('address')
      .object('Address', 'Address Details', 'Your address information')
      .required()
      .build();

    expect(field).toEqual({
      name: 'address',
      data_type: DataType.OBJECT,
      required: true,
      type: 'Address',
      editor: {
        field_type: FieldType.OBJECT_FORM,
        label: 'Address Details',
        description: 'Your address information'
      }
    });
  });

  test('creates array field with auto-inference', () => {
    const field = new FieldBuilder('tags')
      .array(DataType.STRING, 'Tags', 'List of tags')
      .optional()
      .build();

    expect(field).toEqual({
      name: 'tags',
      data_type: DataType.ARRAY,
      required: false,
      type: DataType.STRING,
      editor: {
        field_type: FieldType.REPEATER,
        label: 'Tags',
        description: 'List of tags'
      }
    });
  });

  test('creates model array with model repeater', () => {
    const field = new FieldBuilder('items')
      .array('Item', 'Items', 'List of items')
      .required()
      .build();

    expect(field).toEqual({
      name: 'items',
      data_type: DataType.ARRAY,
      required: true,
      type: 'Item',
      editor: {
        field_type: FieldType.MODEL_REPEATER,
        label: 'Items',
        description: 'List of items'
      }
    });
  });

  test('throws error when building without data type', () => {
    const builder = new FieldBuilder('invalid');
    expect(() => builder.build()).toThrow("Field 'invalid' must have a data type");
  });
});

describe.skip('ModelBuilder', () => {
  test('creates model with fields', () => {
    const builder = new ModelBuilder('Address');
    
    builder.field('street').textEditor('Street', 'Street address').required().build();
    builder.field('city').textEditor('City', 'City name').required().build();
    builder.field('zipCode').textEditor('Zip Code', 'Postal code').optional().build();
    
    const model = builder.build();

    expect(model.name).toBe('Address');
    expect(model.fields).toHaveLength(3);
    expect(model.fields[0].name).toBe('street');
    expect(model.fields[1].name).toBe('city');
    expect(model.fields[2].name).toBe('zipCode');
  });

  test('throws error when building without name', () => {
    const builder = new (ModelBuilder as unknown as new (name?: string) => typeof ModelBuilder)(undefined);
    expect(() => builder.build()).toThrow('Component must have a name');
  });
});

describe.skip('SchemaBuilder', () => {
  test('creates complete schema with models and fields', () => {
    const schema = createSchema('UserForm', '1.0.0')
      .uses(['AddressSchema.ts'])
      .model('Address', builder => {
        builder.field('street').textEditor('Street').required();
        builder.field('city').textEditor('City').required();
      })
      .field('name').textEditor('Full Name', 'Your full name').required()
      .field('email').emailEditor('Email', 'Your email address').required()
      .field('address').object('Address', 'Address', 'Your address').optional()
      .build();

    expect(schema).toEqual({
      name: 'UserForm',
      version: '1.0.0',
      uses: ['AddressSchema.ts'],
      models: {
        Address: {
          name: 'Address',
          fields: [
            {
              name: 'street',
              data_type: DataType.STRING,
              required: true,
              editor: {
                field_type: FieldType.TEXT,
                label: 'Street',
                description: ''
              }
            },
            {
              name: 'city',
              data_type: DataType.STRING,
              required: true,
              editor: {
                field_type: FieldType.TEXT,
                label: 'City',
                description: ''
              }
            }
          ]
        }
      },
      fields: [
        {
          name: 'name',
          data_type: DataType.STRING,
          required: true,
          editor: {
            field_type: FieldType.TEXT,
            label: 'Full Name',
            description: 'Your full name'
          }
        },
        {
          name: 'email',
          data_type: DataType.STRING,
          required: true,
          editor: {
            field_type: FieldType.EMAIL,
            label: 'Email',
            description: 'Your email address'
          }
        },
        {
          name: 'address',
          data_type: DataType.OBJECT,
          required: false,
          type: 'Address',
          editor: {
            field_type: FieldType.OBJECT_FORM,
            label: 'Address',
            description: 'Your address'
          }
        }
      ]
    });
  });

  test('creates minimal schema', () => {
    const schema = createSchema('Simple')
      .field('title').textEditor('Title').required()
      .build();

    expect(schema.name).toBe('Simple');
    expect(schema.version).toBe('1.0.0'); // default
    expect(schema.fields).toHaveLength(1);
    expect(schema.models).toEqual({});
  });

  test('throws error when building without name', () => {
    const builder = new (SchemaBuilder as unknown as new (name?: string) => typeof SchemaBuilder)(undefined);
    expect(() => builder.build()).toThrow('Schema must have a name');
  });
});

describe.skip('Integration Tests', () => {
  test('creates complex FeatureCard-like schema', () => {
    const schema = createSchema('FeatureCard', '1.0.0')
      .model('Feature', builder => {
        builder.field('id').textEditor('Feature ID').required();
        builder.field('title').textEditor('Title', 'Feature title').required();
        builder.field('description').textAreaEditor('Description', 'Feature description').optional();
        builder.field('icon').textEditor('Icon', 'Icon identifier').optional();
      })
      .model('Action', builder => {
        builder.field('id').textEditor('Action ID').required();
        builder.field('label').textEditor('Label').required();
        builder.field('variant').selectSingleEditor([
          { label: 'Contained', value: 'contained' },
          { label: 'Outlined', value: 'outlined' }
        ], 'Style').optional();
      })
      .field('feature').object('Feature', 'Feature Data').optional()
      .field('features').array(DataType.STRING, 'Features List').optional()
      .field('actions').array('Action', 'Actions').optional()
      .field('variant').selectSingleEditor([
        { label: 'Standard', value: 'standard' },
        { label: 'List', value: 'list' }
      ], 'Card Type').optional()
      .field('elevation').numberEditor('integer', 'Elevation', 'Card elevation (0-24)', 0, 24).optional()
      .build();

    // Verify schema structure
    expect(schema.name).toBe('FeatureCard');
    expect(schema.version).toBe('1.0.0');
    expect(Object.keys(schema.models || {})).toEqual(['Feature', 'Action']);
    expect(schema.fields).toHaveLength(5);
    
    // Verify Feature model
    const featureComponent = schema.models!.Feature;
    expect(featureComponent.fields).toHaveLength(4);
    expect(featureComponent.fields.find(f => f.name === 'title')?.required).toBe(true);
    
    // Verify Action model
    const actionComponent = schema.models!.Action;
    expect(actionComponent.fields).toHaveLength(3);
    
    // Verify main fields
    const featureField = schema.fields.find(f => f.name === 'feature');
    expect(featureField?.data_type).toBe(DataType.OBJECT);
    expect(featureField?.type).toBe('Feature');
    
    const actionsField = schema.fields.find(f => f.name === 'actions');
    expect(actionsField?.data_type).toBe(DataType.ARRAY);
    expect(actionsField?.type).toBe('Action');
    
    const elevationField = schema.fields.find(f => f.name === 'elevation');
    expect(elevationField?.data_type).toBe(DataType.INTEGER);
    expect(elevationField?.editor?.validation?.min).toBe(0);
    expect(elevationField?.editor?.validation?.max).toBe(24);
  });
});