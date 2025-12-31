<script lang="ts">
	import { Shield, Lock, Key, AlertTriangle, CheckCircle, Globe } from 'lucide-svelte';
</script>

<div class="security-flow-container">
	<div class="security-header">
		<h3 class="text-2xl font-display uppercase tracking-[0.2em]">Security Architecture</h3>
		<p class="font-mono text-sm text-ink/70">Token-based authentication with IP binding and rate limiting</p>
	</div>

	<div class="security-grid">
		<!-- Step 1: Token Generation -->
		<div class="security-card">
			<div class="card-header">
				<div class="icon-wrapper">
					<Key size={24} />
				</div>
				<h4 class="card-title">1. Token Generation</h4>
			</div>
			<div class="card-content">
				<p class="card-description">User accesses AI chat page</p>
				<div class="code-snippet">
					<code>POST /api/auth/token</code>
					<code>→ Returns: JWT token</code>
					<code>→ Bound to: IP address</code>
				</div>
				<div class="security-badge success">
					<CheckCircle size={14} />
					<span>Secure Generation</span>
				</div>
			</div>
		</div>

		<!-- Step 2: Token Validation -->
		<div class="security-card">
			<div class="card-header">
				<div class="icon-wrapper">
					<Shield size={24} />
				</div>
				<h4 class="card-title">2. Token Validation</h4>
			</div>
			<div class="card-content">
				<p class="card-description">Every request is validated</p>
				<div class="code-snippet">
					<code>Verify JWT signature</code>
					<code>Check IP match</code>
					<code>Validate expiration</code>
				</div>
				<div class="security-badge warning">
					<AlertTriangle size={14} />
					<span>Strict Validation</span>
				</div>
			</div>
		</div>

		<!-- Step 3: Rate Limiting -->
		<div class="security-card">
			<div class="card-header">
				<div class="icon-wrapper">
					<Lock size={24} />
				</div>
				<h4 class="card-title">3. Rate Limiting</h4>
			</div>
			<div class="card-content">
				<p class="card-description">Prevent abuse and overuse</p>
				<div class="code-snippet">
					<code>Max: 100 req/hour</code>
					<code>Per IP: 50 req/hour</code>
					<code>Per token: 20 req/min</code>
				</div>
				<div class="security-badge info">
					<Globe size={14} />
					<span>Global Limits</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Security Flow Diagram -->
	<div class="flow-diagram">
		<div class="flow-step">
			<div class="flow-node">
				<p class="flow-label">User Request</p>
				<p class="flow-sublabel">From chat page</p>
			</div>
			<div class="flow-arrow">→</div>
		</div>

		<div class="flow-step">
			<div class="flow-node highlight">
				<p class="flow-label">Token Check</p>
				<p class="flow-sublabel">JWT + IP validation</p>
			</div>
			<div class="flow-arrow">→</div>
		</div>

		<div class="flow-step">
			<div class="flow-node highlight">
				<p class="flow-label">Rate Limit</p>
				<p class="flow-sublabel">Check usage quota</p>
			</div>
			<div class="flow-arrow">→</div>
		</div>

		<div class="flow-step">
			<div class="flow-node success">
				<p class="flow-label">MCP Server</p>
				<p class="flow-sublabel">Execute tool</p>
			</div>
		</div>
	</div>

	<!-- Protected Endpoints -->
	<div class="protected-endpoints">
		<h4 class="endpoints-title">Protected Endpoints</h4>
		<div class="endpoints-grid">
			<div class="endpoint-item">
				<span class="endpoint-method">POST</span>
				<span class="endpoint-path">/api/chat</span>
				<span class="endpoint-desc">Send message to AI</span>
			</div>
			<div class="endpoint-item">
				<span class="endpoint-method">GET</span>
				<span class="endpoint-path">/api/tools</span>
				<span class="endpoint-desc">List available tools</span>
			</div>
			<div class="endpoint-item">
				<span class="endpoint-method">POST</span>
				<span class="endpoint-path">/api/tool-call</span>
				<span class="endpoint-desc">Execute MCP tool</span>
			</div>
            <div class="endpoint-item">
				<span class="endpoint-method">GET</span>
				<span class="endpoint-path">/api/get-token</span>
				<span class="endpoint-desc">Generate MCP token - no token needed to call</span>
			</div>
		</div>
	</div>
</div>

<style>
	.security-flow-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.security-header {
		text-align: center;
		padding-bottom: 1.5rem;
		border-bottom: 2px dashed #000;
	}

	.security-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.security-card {
		border: 2px solid #000;
		background: #fff;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.security-card:hover {
		transform: translateY(-4px);
		box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.1);
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.5rem;
		border-bottom: 2px solid #000;
		background: #000;
		color: #fff;
	}

	.icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border: 2px solid #fff;
		border-radius: 50%;
	}

	.card-title {
		font-family: var(--font-display);
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
	}

	.card-content {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.card-description {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: rgba(0, 0, 0, 0.7);
	}

	.code-snippet {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
		background: #f5f5f5;
		border: 2px solid #000;
		font-family: var(--font-mono);
		font-size: 0.75rem;
	}

	.security-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border: 2px solid #000;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		width: fit-content;
	}

	.security-badge.success {
		background: #d4edda;
		border-color: #28a745;
		color: #155724;
	}

	.security-badge.warning {
		background: #fff3cd;
		border-color: #ffc107;
		color: #856404;
	}

	.security-badge.info {
		background: #d1ecf1;
		border-color: #17a2b8;
		color: #0c5460;
	}

	.flow-diagram {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 2rem;
		background: #f5f5f5;
		border: 2px dashed #000;
		overflow-x: auto;
	}

	.flow-step {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.flow-node {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1.5rem;
		border: 2px solid #000;
		background: #fff;
		min-width: 140px;
	}

	.flow-node.highlight {
		background: #fff3cd;
		border-color: #ffc107;
	}

	.flow-node.success {
		background: #d4edda;
		border-color: #28a745;
	}

	.flow-label {
		font-family: var(--font-display);
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		text-align: center;
	}

	.flow-sublabel {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: rgba(0, 0, 0, 0.6);
		text-align: center;
	}

	.flow-arrow {
		font-size: 1.5rem;
		font-weight: bold;
	}

	.protected-endpoints {
		padding: 2rem;
		border: 2px solid #000;
		background: #fff;
	}

	.endpoints-title {
		font-family: var(--font-display);
		font-size: 1.25rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 2px dashed #000;
	}

	.endpoints-grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.endpoint-item {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 1rem;
		align-items: center;
		padding: 1rem;
		border: 2px solid #000;
		background: #f5f5f5;
		font-family: var(--font-mono);
		font-size: 0.875rem;
	}

	.endpoint-method {
		padding: 0.25rem 0.75rem;
		background: #000;
		color: #fff;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.endpoint-path {
		font-weight: bold;
	}

	.endpoint-desc {
		color: rgba(0, 0, 0, 0.6);
		text-align: right;
	}

	.security-features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.feature-item {
		display: flex;
		gap: 1rem;
		padding: 1.5rem;
		border: 2px solid #000;
		background: #fff;
	}

	.feature-title {
		font-family: var(--font-display);
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		margin-bottom: 0.5rem;
	}

	.feature-desc {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: rgba(0, 0, 0, 0.7);
		line-height: 1.5;
	}

	@media (max-width: 768px) {
		.flow-diagram {
			flex-direction: column;
		}

		.flow-arrow {
			transform: rotate(90deg);
		}

		.endpoint-item {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}

		.endpoint-desc {
			text-align: left;
		}
	}
</style>
