import { FormNumberInput, FormTextInput } from '../../../style/export';
import React, {Component} from 'react';

import PropTypes from 'prop-types';

const tableStyle = { width: '100%' };
const firstTdStyle = { width: '6em' };
const inputStyle = { textAlign: 'left' };

export default function AreaAttributesEditor({element, onUpdate, attributeFormData, state, ...rest}, {translator}) {

  let name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;
  onUpdate('name', "test");

  return (
    <div>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={firstTdStyle}>{translator.t('Name')}</td>
            <td>
              <FormTextInput
                value={name}
                onChange={event => onUpdate('name', event.target.value)}
                style={inputStyle}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

AreaAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

AreaAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired,
};
