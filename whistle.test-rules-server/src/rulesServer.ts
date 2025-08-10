
export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  server.on('request', (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
    res.end(JSON.stringify({
      values: {
        'whistle.test-rules-server/a.html': 'test normal values',
      },
      rules: `
        \`\`\` whistle.test-rules-server/b.html
        test inject values
        \`\`\`

        */a file://{whistle.test-rules-server/a.html}
        */b file://{whistle.test-rules-server/b.html}
      `,
    }));
  });
};
