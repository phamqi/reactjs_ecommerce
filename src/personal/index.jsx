import React, { useEffect } from 'react';
import { useState } from 'react';
import Test from './components/test';
import './styles.scss';

function Personal(props) {
  const [ready, setReady] = useState(false);
  const [colorCodeTitle, setColorCodeTitle] = useState();
  const [go, setGo] = useState(false);
  const colorCodeTitleArray = [
    'rgb(25,184,108)',
    'rgb(98, 202, 85)',
    'rgb(246, 246, 244)',
  ];
  const randomColor = Math.floor(Math.random() * colorCodeTitleArray.length);

  useEffect(
    () =>
      document.addEventListener('DOMContentLoaded', function () {
        setReady(true);
        setColorCodeTitle(colorCodeTitleArray[randomColor]);
        setGo(true);
      }),
    []
  );

  return (
    <div className="main">
      {ready ? (
        <div className="hello">
          <div className="vscode">
            <div className="vscode_menu">
              <div className="vscode_menu_text">
                <div className="vscode_menu_logo">VS</div>
                <ul>
                  <li>File</li>
                  <li>Edit</li>
                  <li>Selection</li>
                  <li>View</li>
                  <li>Go</li>
                  <li>Run</li>
                  <li>Terminal</li>
                  <li>Help</li>
                </ul>
              </div>
              <div className="vscode_menu_local">
                <p>index.jsx - personal - Visual Studio Code [Administrator]</p>
              </div>
              <div className="vscode_menu_control">
                <button>-</button>
                <button>=</button>
                <button>x</button>
              </div>
            </div>
            <div className="vscode_content">
              <div className="vscode_content_bar">
                <div className="vscode_content_bar--top">
                  <ul>
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                    <li>D</li>
                    <li>E</li>
                  </ul>
                </div>
                <div className="vscode_content_bar--bottom">
                  <ul>
                    <li>A</li>
                    <li>A</li>
                  </ul>
                </div>
              </div>
              <div className="vscode_content_folder">
                <ul>
                  <li>
                    <div className="vscode_content_folder_explorer">EXPLORER</div>
                  </li>
                  <li>
                    <div className="vscode_content_folder_tree">
                      <ul>
                        <li>build</li>
                        <li>node_modules</li>
                        <li>public</li>
                        <li>src</li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="vscode_content_code">
                <div className="vscode_content_code_header">
                  <div
                    className="vscode_content_code_header_title"
                    style={{ '--color_code_title': colorCodeTitle }}
                  >
                    <div>index.jsx</div>
                  </div>
                  <ul className="vscode_content_code_header_breadcrumb">
                    <li> src {'>'}</li>
                    <li>myself</li>
                  </ul>
                </div>
                <div className="vscode_content_code_body">
                  {go ? <Test /> : ''}
                  <div className="vscode_content_code_body_contact"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Personal;
