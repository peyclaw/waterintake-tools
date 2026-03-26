import { Check, Copy, ExternalLink, Share2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { cn } from "#/lib/utils";

export type ShareButtonsProps = {
	totalMl: number;
	glasses: number;
};

/**
 * Compact horizontal row of share buttons for calculator results.
 * Renders: Copy Link, Twitter/X, Facebook.
 */
export function ShareButtons({ glasses }: ShareButtonsProps) {
	const [copied, setCopied] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const getCurrentUrl = useCallback(() => {
		return window.location.href;
	}, []);

	const handleCopy = useCallback(async () => {
		const url = getCurrentUrl();

		try {
			await navigator.clipboard.writeText(url);
		} catch {
			// Fallback for older browsers or non-secure contexts
			const textarea = document.createElement("textarea");
			textarea.value = url;
			textarea.setAttribute("readonly", "");
			textarea.style.position = "absolute";
			textarea.style.left = "-9999px";
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			document.body.removeChild(textarea);
		}

		setCopied(true);

		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		timerRef.current = setTimeout(() => {
			setCopied(false);
			timerRef.current = null;
		}, 2000);
	}, [getCurrentUrl]);

	const handleTwitterShare = useCallback(() => {
		const url = getCurrentUrl();
		const roundedGlasses = Math.round(glasses);
		const text = `I need ${roundedGlasses} glasses of water daily! Calculate yours:`;
		const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
		window.open(twitterUrl, "_blank", "noopener,noreferrer");
	}, [getCurrentUrl, glasses]);

	const handleFacebookShare = useCallback(() => {
		const url = getCurrentUrl();
		const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
		window.open(facebookUrl, "_blank", "noopener,noreferrer");
	}, [getCurrentUrl]);

	return (
		<div
			className="flex items-center justify-center gap-2 pt-4"
			role="group"
			aria-label="Share your results"
		>
			<button
				type="button"
				onClick={handleCopy}
				aria-label={copied ? "Link copied to clipboard" : "Copy link to clipboard"}
				className={cn(
					"inline-flex min-h-12 items-center gap-1.5 rounded-lg px-3 py-1.5",
					"border border-[var(--color-border)] bg-[var(--color-surface)]",
					"text-sm font-medium text-[var(--color-text-muted)]",
					"hover:bg-[var(--color-primary-light)] hover:text-[var(--color-text)]",
					"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
					"transition-colors duration-200",
				)}
			>
				{copied ? (
					<Check size={14} aria-hidden="true" />
				) : (
					<Copy size={14} aria-hidden="true" />
				)}
				<span>{copied ? "Copied!" : "Copy link"}</span>
			</button>

			<button
				type="button"
				onClick={handleTwitterShare}
				aria-label="Share on Twitter"
				className={cn(
					"inline-flex min-h-12 items-center gap-1.5 rounded-lg px-3 py-1.5",
					"border border-[var(--color-border)] bg-[var(--color-surface)]",
					"text-sm font-medium text-[var(--color-text-muted)]",
					"hover:bg-[var(--color-primary-light)] hover:text-[var(--color-text)]",
					"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
					"transition-colors duration-200",
				)}
			>
				<Share2 size={14} aria-hidden="true" />
				<span>Twitter</span>
			</button>

			<button
				type="button"
				onClick={handleFacebookShare}
				aria-label="Share on Facebook"
				className={cn(
					"inline-flex min-h-12 items-center gap-1.5 rounded-lg px-3 py-1.5",
					"border border-[var(--color-border)] bg-[var(--color-surface)]",
					"text-sm font-medium text-[var(--color-text-muted)]",
					"hover:bg-[var(--color-primary-light)] hover:text-[var(--color-text)]",
					"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
					"transition-colors duration-200",
				)}
			>
				<ExternalLink size={14} aria-hidden="true" />
				<span>Facebook</span>
			</button>
		</div>
	);
}
