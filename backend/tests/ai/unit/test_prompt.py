from pathlib import Path
from unittest.mock import patch

import pytest

from app.ai.prompts.prompt_manager import PromptManager


def test_prompt_manager_initializes_templates_directory():
    manager = PromptManager()

    assert manager.templates_dir == (
        Path(__file__).resolve().parents[3]
        / "app"
        / "ai"
        / "prompts"
        / "templates"
    )


def test_load_template_returns_file_content(tmp_path):
    manager = PromptManager()

    template_path = tmp_path / "test.txt"
    template_path.write_text(
        "Question: {question}\nContexte: {context}",
        encoding="utf-8",
    )

    result = manager._load_template(template_path)

    assert result == "Question: {question}\nContexte: {context}"


def test_load_template_raises_when_file_does_not_exist(tmp_path):
    manager = PromptManager()

    template_path = tmp_path / "missing.txt"

    with pytest.raises(
        FileNotFoundError,
        match="Template introuvable",
    ):
        manager._load_template(template_path)


def test_build_rag_prompt_rejects_empty_question():
    manager = PromptManager()

    with pytest.raises(
        ValueError,
        match="La question ne peut pas être vide",
    ):
        manager.build_rag_prompt(
            question="",
            context="Contexte valide",
        )


def test_build_rag_prompt_rejects_whitespace_question():
    manager = PromptManager()

    with pytest.raises(
        ValueError,
        match="La question ne peut pas être vide",
    ):
        manager.build_rag_prompt(
            question="   ",
            context="Contexte valide",
        )


def test_build_rag_prompt_rejects_empty_context():
    manager = PromptManager()

    with pytest.raises(
        ValueError,
        match="Le contexte ne peut pas être vide",
    ):
        manager.build_rag_prompt(
            question="Question valide",
            context="",
        )


def test_build_rag_prompt_rejects_whitespace_context():
    manager = PromptManager()

    with pytest.raises(
        ValueError,
        match="Le contexte ne peut pas être vide",
    ):
        manager.build_rag_prompt(
            question="Question valide",
            context="   ",
        )


def test_build_rag_prompt_loads_template_and_formats_values():
    manager = PromptManager()

    template = (
        "QUESTION:\n"
        "{question}\n\n"
        "CONTEXTE:\n"
        "{context}"
    )

    with patch.object(
        manager,
        "_load_template",
        return_value=template,
    ) as load_template:
        result = manager.build_rag_prompt(
            question="  Quelle est ALTIORA ?  ",
            context="  ALTIORA est une entreprise.  ",
        )

    assert result == (
        "QUESTION:\n"
        "Quelle est ALTIORA ?\n\n"
        "CONTEXTE:\n"
        "ALTIORA est une entreprise."
    )

    load_template.assert_called_once()

    template_path = load_template.call_args.args[0]

    assert template_path.name == "answer.txt"
    assert template_path.parent.name == "rag"


def test_build_rag_prompt_uses_real_template():
    manager = PromptManager()

    result = manager.build_rag_prompt(
        question="  Test question  ",
        context="  Test context  ",
    )

    assert "Test question" in result
    assert "Test context" in result
    assert "{question}" not in result
    assert "{context}" not in result
