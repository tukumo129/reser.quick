<?php

$config = new PhpCsFixer\Config();
return $config->setRules([
        '@PSR12' => true,
        'array_syntax' => ['syntax' => 'short'],
        'binary_operator_spaces' => [
            'default' => 'single_space',
        ],
        'trailing_comma_in_multiline' => [
            'elements' => ['arrays', 'arguments'],
        ],
        'method_argument_space' => [
            'on_multiline' => 'ensure_fully_multiline',
            'keep_multiple_spaces_after_comma' => false,
        ],
        'no_unused_imports' => true,
        'single_quote' => true,
        'no_trailing_whitespace' => true,
        'no_blank_lines_after_phpdoc' => true,
        'normalize_index_brace' => true,
        'ordered_imports' => ['sort_algorithm' => 'alpha'],
        'concat_space' => ['spacing' => 'one'],
        'no_superfluous_phpdoc_tags' => true,
        'yoda_style' => false,
        'class_attributes_separation' => [
            'elements' => ['method' => 'one', 'property' => 'one'],
        ],
    ])
    ->setFinder(
        PhpCsFixer\Finder::create()
            ->ignoreVCSIgnored(true)
            ->in(__DIR__)
    );
