import * as configcat from 'configcat-js';

export function initializeClient() {
    const logger = configcat.createConsoleLogger(configcat.LogLevel.Info);

    const configCatClient = configcat.getClient('YOUR-SDK-KEY',
        configcat.PollingMode.AutoPoll,
        {
            setupHooks: (hooks) => {
                hooks.on('flagEvaluated', evaluationDetails => {
                    const variant = "configcat-" + evaluationDetails.key + "-" + evaluationDetails.value;
                    gtag('event', 'experience_impression', {
                            'exp_variant_string': variant,
                            'variation_id': evaluationDetails.variationId
                    });
                })
            },
            logger: logger
        });

    return configCatClient;
}