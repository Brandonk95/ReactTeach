import { useRef, useState } from 'react';
import { InlineMarkdown } from './Markdown.jsx';

export function QuizView({ lesson, progress, next }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const scroller = useRef(null);
  const questions = lesson.questions;
  const score = questions.filter((q, i) => answers[i] === q.answer).length;
  const allAnswered = questions.every((_, i) => answers[i] !== undefined);
  const passed = submitted && score === questions.length;

  function submit() {
    setSubmitted(true);
    if (score === questions.length) progress.complete(lesson.id);
    scroller.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function retry() {
    // Keep the correct answers, clear the wrong ones.
    setAnswers((a) => Object.fromEntries(Object.entries(a).filter(([i, v]) => questions[i].answer === v)));
    setSubmitted(false);
  }

  return (
    <div className="quiz scroll" ref={scroller}>
      <div className="quiz-inner">
        <h1>{lesson.title}</h1>
        <p className="muted">Answer all {questions.length} questions correctly to complete this quiz. You can retry as many times as you like.</p>

        {submitted && (
          <div className={`quiz-result ${passed ? 'good' : 'bad'}`}>
            {passed ? (
              <>
                <strong>🎉 Perfect score: {score}/{questions.length}!</strong>
                {next && (
                  <a className="btn btn-check" href={`#/lesson/${next.id}`}>
                    Next: {next.title} →
                  </a>
                )}
              </>
            ) : (
              <>
                <strong>
                  You got {score}/{questions.length}. Read the explanations below, then try again.
                </strong>
                <button className="btn" onClick={retry}>
                  Retry wrong answers
                </button>
              </>
            )}
          </div>
        )}

        {questions.map((q, i) => {
          const chosen = answers[i];
          const correct = chosen === q.answer;
          return (
            <fieldset key={i} className={`question ${submitted ? (correct ? 'right' : 'wrong') : ''}`}>
              <legend>
                <span className="q-num">{i + 1}</span>
                <InlineMarkdown text={q.q} />
              </legend>
              {q.options.map((opt, j) => (
                <label key={j} className={`option ${chosen === j ? 'chosen' : ''} ${submitted && j === q.answer ? 'answer' : ''}`}>
                  <input type="radio" name={`q${i}`} checked={chosen === j} disabled={submitted} onChange={() => setAnswers({ ...answers, [i]: j })} />
                  <InlineMarkdown text={opt} />
                </label>
              ))}
              {submitted && (
                <div className="explain">
                  {correct ? '✓ Correct! ' : '✗ Not quite. '}
                  <InlineMarkdown text={q.explain} />
                </div>
              )}
            </fieldset>
          );
        })}

        {!submitted && (
          <button className="btn btn-check btn-lg" disabled={!allAnswered} onClick={submit}>
            {allAnswered ? 'Submit answers' : `Answer all questions (${Object.keys(answers).length}/${questions.length})`}
          </button>
        )}
      </div>
    </div>
  );
}
